<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import api from '@/services/api'

const router = useRouter()

const email = ref('')
const password = ref('')
const remember = ref(false)

const showPassword = ref(false)

const loading = ref(false)
const checkingSession = ref(false)

const errorMessage = ref('')
const fieldErrors = ref({})


/*
|--------------------------------------------------------------------------
| Page Mount
|--------------------------------------------------------------------------
*/

onMounted(async () => {
  document.title = 'Login | RH Nexus Events'

  /*
  |--------------------------------------------------------------------------
  | Check Existing Laravel Session
  |--------------------------------------------------------------------------
  |
  | Agar user pehle se Laravel session mein authenticated hai,
  | to login POST dobara send nahi karenge.
  |
  | Is se Fortify guest middleware ka /home redirect issue
  | avoid ho jayega.
  |
  */

  await checkExistingSession()
})


/*
|--------------------------------------------------------------------------
| Get Authenticated User
|--------------------------------------------------------------------------
|
| GET /api/user
|
| Expected response:
|
| {
|   "user": {
|       "id": 1,
|       "name": "Admin",
|       "email": "admin@example.com"
|   }
| }
|
*/

const getAuthenticatedUser = async () => {
  const response = await api.get('/user')

  /*
  |--------------------------------------------------------------------------
  | Support Both Response Formats
  |--------------------------------------------------------------------------
  |
  | Format 1:
  |
  | {
  |   user: {...}
  | }
  |
  | Format 2:
  |
  | {
  |   id: 1,
  |   name: "...",
  |   email: "..."
  | }
  |
  */

  if (response.data?.user) {
    return response.data.user
  }

  if (response.data?.id) {
    return response.data
  }

  return null
}


/*
|--------------------------------------------------------------------------
| Save User + Redirect
|--------------------------------------------------------------------------
*/

const completeLogin = async (
  authenticatedUser = null
) => {

  if (authenticatedUser) {

    localStorage.setItem(
      'user',
      JSON.stringify(
        authenticatedUser
      )
    )

  }

  await router.replace(
    '/dashboard'
  )
}


/*
|--------------------------------------------------------------------------
| Check Existing Session
|--------------------------------------------------------------------------
*/

const checkExistingSession = async () => {

  checkingSession.value = true

  try {

    const authenticatedUser =
      await getAuthenticatedUser()

    /*
    |--------------------------------------------------------------------------
    | Already Authenticated
    |--------------------------------------------------------------------------
    */

    if (authenticatedUser) {

      console.log(
        'Existing authenticated session:',
        authenticatedUser
      )

      await completeLogin(
        authenticatedUser
      )

      return true
    }

  } catch (error) {

    /*
    |--------------------------------------------------------------------------
    | 401 = Normal Guest User
    |--------------------------------------------------------------------------
    |
    | Login page open karne wale guest ke liye
    | /api/user ka 401 normal hai.
    |
    */

    if (
      error.response?.status !== 401
    ) {

      console.log(
        'Session check:',
        error.response?.data ||
        error.message
      )

    }

  } finally {

    checkingSession.value = false

  }

  return false
}


/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

const login = async () => {

  /*
  |--------------------------------------------------------------------------
  | Prevent Duplicate Requests
  |--------------------------------------------------------------------------
  */

  if (
    loading.value ||
    checkingSession.value
  ) {
    return
  }


  /*
  |--------------------------------------------------------------------------
  | Reset Previous Errors
  |--------------------------------------------------------------------------
  */

  errorMessage.value = ''
  fieldErrors.value = {}


  /*
  |--------------------------------------------------------------------------
  | Frontend Validation
  |--------------------------------------------------------------------------
  */

  if (!email.value) {

    fieldErrors.value.email = [
      'Email is required.'
    ]

    return
  }


  if (!password.value) {

    fieldErrors.value.password = [
      'Password is required.'
    ]

    return
  }


  loading.value = true


  try {

    /*
    |--------------------------------------------------------------------------
    | Step 0: Check Session Again
    |--------------------------------------------------------------------------
    |
    | User ne login page open karne ke baad kisi aur tab mein
    | login kar liya ho to Fortify /login ko dobara hit
    | nahi karna.
    |
    */

    try {

      const existingUser =
        await getAuthenticatedUser()

      if (existingUser) {

        console.log(
          'User already authenticated.'
        )

        await completeLogin(
          existingUser
        )

        return
      }

    } catch (sessionError) {

      /*
      | 401 expected hai agar user guest hai.
      */

      if (
        sessionError.response?.status !== 401
      ) {

        console.log(
          'Pre-login session check:',
          sessionError.response?.data ||
          sessionError.message
        )

      }

    }


    /*
    |--------------------------------------------------------------------------
    | Step 1: Get Sanctum CSRF Cookie
    |--------------------------------------------------------------------------
    */

    await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/sanctum/csrf-cookie`,
      {
        withCredentials: true,
        withXSRFToken: true,

        headers: {
          Accept: 'application/json'
        }
      }
    )


    /*
    |--------------------------------------------------------------------------
    | Step 2: Fortify Login
    |--------------------------------------------------------------------------
    */

    const response = await api.post(
      '/login',

      {
        email: email.value,
        password: password.value,
        remember: remember.value
      },

      {
        headers: {
          Accept: 'application/json'
        }
      }
    )


    console.log(
      'Login response:',
      response.data
    )


    /*
    |--------------------------------------------------------------------------
    | Existing Token Support
    |--------------------------------------------------------------------------
    |
    | Sanctum SPA session auth mein normally
    | token required nahi hota.
    |
    | Lekin future mein API token return kare
    | to ye existing support preserve hai.
    |
    */

    if (response.data?.token) {

      localStorage.setItem(
        'auth_token',
        response.data.token
      )

    }


    /*
    |--------------------------------------------------------------------------
    | Get User From Login Response
    |--------------------------------------------------------------------------
    */

    let authenticatedUser =
      response.data?.user || null


    /*
    |--------------------------------------------------------------------------
    | Fallback: Get User From Session
    |--------------------------------------------------------------------------
    |
    | Agar custom LoginResponse user return nahi karta,
    | to authenticated session se user fetch kar lenge.
    |
    */

    if (!authenticatedUser) {

      try {

        authenticatedUser =
          await getAuthenticatedUser()

      } catch (userError) {

        console.log(
          'Unable to fetch authenticated user:',
          userError.response?.data ||
          userError.message
        )

      }

    }


    /*
    |--------------------------------------------------------------------------
    | Successful Login
    |--------------------------------------------------------------------------
    */

    await completeLogin(
      authenticatedUser
    )


  } catch (error) {

    console.error(
      'Login Error:',
      error
    )


    /*
    |--------------------------------------------------------------------------
    | IMPORTANT RECOVERY
    |--------------------------------------------------------------------------
    |
    | Aapke current issue mein:
    |
    | POST /api/login
    |      ↓
    | Laravel authenticate kar deta hai
    |      ↓
    | /home redirect
    |      ↓
    | Browser CORS Network Error
    |
    | Axios ko lagta hai login fail hua.
    |
    | Lekin Laravel session actually authenticated
    | ho sakti hai.
    |
    | Isliye error show karne se pehle hum
    | /api/user check karenge.
    |
    */

    try {

      const recoveredUser =
        await getAuthenticatedUser()

      if (recoveredUser) {

        console.log(
          'Authenticated session recovered:',
          recoveredUser
        )

        await completeLogin(
          recoveredUser
        )

        return
      }

    } catch (recoveryError) {

      /*
      | Session authenticated nahi hai.
      | Ab actual login error handle karenge.
      */

      console.log(
        'No authenticated session to recover.'
      )

    }


    /*
    |--------------------------------------------------------------------------
    | Validation / Wrong Credentials
    |--------------------------------------------------------------------------
    */

    if (
      error.response?.status === 422
    ) {

      fieldErrors.value =
        error.response.data.errors || {}

      errorMessage.value =
        error.response.data.message ||
        'Please check your login details.'

    }


    /*
    |--------------------------------------------------------------------------
    | Unauthorized
    |--------------------------------------------------------------------------
    */

    else if (
      error.response?.status === 401
    ) {

      errorMessage.value =
        error.response.data.message ||
        'Invalid email or password.'

    }


    /*
    |--------------------------------------------------------------------------
    | CSRF Error
    |--------------------------------------------------------------------------
    */

    else if (
      error.response?.status === 419
    ) {

      errorMessage.value =
        'Your session has expired. Please try again.'

    }


    /*
    |--------------------------------------------------------------------------
    | Rate Limit
    |--------------------------------------------------------------------------
    */

    else if (
      error.response?.status === 429
    ) {

      errorMessage.value =
        'Too many login attempts. Please try again shortly.'

    }


    /*
    |--------------------------------------------------------------------------
    | CORS / Network Error
    |--------------------------------------------------------------------------
    */

    else if (
      !error.response
    ) {

      errorMessage.value =
        'Unable to connect to the authentication server. Please try again.'

    }


    /*
    |--------------------------------------------------------------------------
    | Other Errors
    |--------------------------------------------------------------------------
    */

    else {

      errorMessage.value =
        error.response?.data?.message ||
        'Unable to login. Please try again.'

    }

  } finally {

    loading.value = false

  }
}
</script>

<template>
  <main
    id="main"
    class="login-page"
  >

    <div
      class="login-background"
    ></div>


    <div
      class="container login-container"
    >

      <!-- ========================================
           LEFT SIDE
      ========================================= -->

      <section
        class="login-intro"
      >

        <RouterLink
          to="/"
          class="login-brand"
        >

          <!--
          <img
            src="../assets/images/logo-round-transparent.png"
            alt="RH Nexus Events"
          >

          <div>
            <strong>
              RH Nexus
            </strong>

            <span>
              Events
            </span>
          </div>
          -->

        </RouterLink>


        <div
          class="login-intro-content"
        >

          <p class="eyebrow">
            Welcome Back
          </p>


          <h1>
            Manage your events

            <span>
              beautifully.
            </span>
          </h1>


          <p>
            Sign in to your RH Nexus Events
            dashboard to manage events,
            packages, enquiries, bookings
            and more.
          </p>


          <div
            class="login-features"
          >

            <!-- Feature 1 -->

            <div>

              <span>
                ✓
              </span>

              <p>

                <strong>
                  Event Management
                </strong>

                Manage your upcoming events
                in one place.

              </p>

            </div>


            <!-- Feature 2 -->

            <div>

              <span>
                ✓
              </span>

              <p>

                <strong>
                  Customer Enquiries
                </strong>

                Review and respond to
                client requests.

              </p>

            </div>


            <!-- Feature 3 -->

            <div>

              <span>
                ✓
              </span>

              <p>

                <strong>
                  Secure Access
                </strong>

                Your management dashboard
                stays protected.

              </p>

            </div>

          </div>

        </div>

      </section>



      <!-- ========================================
           LOGIN CARD
      ========================================= -->

      <section
        class="login-card"
      >

        <div
          class="login-card-heading"
        >

          <p class="eyebrow">
            Account Access
          </p>

          <h2>
            Sign in
          </h2>

          <p>
            Enter your account details
            to continue.
          </p>

        </div>



        <!-- ========================================
             GLOBAL ERROR
        ========================================= -->

        <div
          v-if="errorMessage"
          class="login-alert"
          role="alert"
        >
          {{ errorMessage }}
        </div>



        <!-- ========================================
             LOGIN FORM
        ========================================= -->

        <form
          class="login-form"
          @submit.prevent="login"
        >


          <!-- ========================================
               EMAIL
          ========================================= -->

          <div
            class="login-field"
          >

            <label
              for="email"
            >
              Email Address
            </label>


            <div
              class="input-wrap"
              :class="{
                'input-error':
                  fieldErrors.email
              }"
            >

              <span
                class="input-icon"
              >
                @
              </span>


              <input
                id="email"
                v-model.trim="email"
                type="email"
                name="email"
                autocomplete="email"
                placeholder="you@example.com"
                :disabled="loading"
              >

            </div>


            <small
              v-if="fieldErrors.email"
              class="field-error"
            >
              {{ fieldErrors.email[0] }}
            </small>

          </div>



          <!-- ========================================
               PASSWORD
          ========================================= -->

          <div
            class="login-field"
          >

            <div
              class="password-label"
            >

              <label
                for="password"
              >
                Password
              </label>


              
            </div>



            <div
              class="input-wrap"
              :class="{
                'input-error':
                  fieldErrors.password
              }"
            >

              <span
                class="input-icon"
              >
                ●
              </span>


              <input
                id="password"
                v-model="password"
                :type="
                  showPassword
                    ? 'text'
                    : 'password'
                "
                name="password"
                autocomplete="current-password"
                placeholder="Enter your password"
                :disabled="loading"
              >


              <button
                type="button"
                class="password-toggle"
                :aria-label="
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                "
                @click="
                  showPassword =
                    !showPassword
                "
              >

                {{
                  showPassword
                    ? 'Hide'
                    : 'Show'
                }}

              </button>

            </div>


            <small
              v-if="fieldErrors.password"
              class="field-error"
            >
              {{ fieldErrors.password[0] }}
            </small>

          </div>



          <!-- ========================================
               REMEMBER ME
          ========================================= -->

          <label
            class="remember-row"
          >

            <input
              v-model="remember"
              type="checkbox"
            >

            <span>
              Remember me
            </span>

          </label>



          <!-- ========================================
               SUBMIT BUTTON
          ========================================= -->

          <button
            type="submit"
            class="btn btn-primary login-button"
            :disabled="loading"
          >

            <span
              v-if="!loading"
            >
              Sign In
            </span>


            <span
              v-else
              class="login-loading"
            >

              <span
                class="login-spinner"
              ></span>

              Signing in...

            </span>

          </button>

        </form>



        <!-- ========================================
             BOTTOM TEXT
        ========================================= -->

        <div
          class="login-footer-text"
        >

          <span>
            Need help accessing
            your account?
          </span>

          <RouterLink
            to="/contact"
          >
            Contact us
          </RouterLink>

        </div>

      </section>

    </div>

  </main>
</template>


<style scoped>

/* ========================================
   PAGE
======================================== */

.login-page {
  position: relative;
  min-height: 100vh;
  padding: 140px 0 70px;
  color: var(--white);
  background: var(--ink);
  overflow: hidden;
}


/* ========================================
   BACKGROUND
======================================== */

.login-background {
  position: absolute;
  inset: 0;

  background:
    radial-gradient(
      circle at 15% 15%,
      rgba(148, 193, 31, .16),
      transparent 28%
    ),
    radial-gradient(
      circle at 85% 75%,
      rgba(148, 193, 31, .08),
      transparent 30%
    ),
    linear-gradient(
      135deg,
      #070a07,
      #111811
    );
}


.login-background::before {
  content: "";

  position: absolute;

  width: 520px;
  height: 520px;

  right: -220px;
  top: 80px;

  border:
    1px solid
    rgba(148, 193, 31, .18);

  border-radius: 50%;

  box-shadow:
    0 0 0 90px
    rgba(148, 193, 31, .025),

    0 0 0 180px
    rgba(148, 193, 31, .015);
}


/* ========================================
   CONTAINER
======================================== */

.login-container {
  position: relative;
  z-index: 2;

  display: grid;

  grid-template-columns:
    1fr 520px;

  gap:
    clamp(
      60px,
      8vw,
      120px
    );

  align-items: center;
}


/* ========================================
   LEFT SIDE
======================================== */

.login-intro {
  max-width: 630px;
}


.login-brand {
  width: fit-content;

  display: flex;

  align-items: center;

  gap: 14px;

  margin-bottom: 70px;
}


.login-brand img {
  width: 70px;
  height: 70px;

  object-fit: contain;

  filter:
    drop-shadow(
      0 10px 20px
      rgba(0, 0, 0, .35)
    );
}


.login-brand div {
  display: grid;
}


.login-brand strong {
  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 1.25rem;
  font-weight: 500;
}


.login-brand span {
  margin-top: 3px;

  color: var(--green);

  font-size: .7rem;
  font-weight: 900;

  letter-spacing: .28em;

  text-transform: uppercase;
}


.login-intro .eyebrow {
  color: var(--green);
}


.login-intro h1 {
  margin: 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size:
    clamp(
      3rem,
      5vw,
      5rem
    );

  font-weight: 500;

  line-height: 1;

  letter-spacing: -.04em;
}


.login-intro h1 span {
  display: block;

  color: var(--green);
}


.login-intro-content
> p:not(.eyebrow) {

  max-width: 570px;

  margin:
    27px 0 35px;

  color:
    rgba(
      255,
      255,
      255,
      .65
    );

  font-size: 1rem;
}


/* ========================================
   FEATURES
======================================== */

.login-features {
  display: grid;

  gap: 18px;
}


.login-features > div {
  display: flex;

  gap: 15px;
}


.login-features
> div
> span {

  flex: 0 0 32px;

  width: 32px;
  height: 32px;

  display: grid;

  place-items: center;

  margin-top: 4px;

  color: var(--ink);

  background:
    var(--green);

  border-radius: 50%;

  font-weight: 900;
}


.login-features p {
  display: grid;

  gap: 2px;

  margin: 0;

  color:
    rgba(
      255,
      255,
      255,
      .55
    );

  font-size: .87rem;
}


.login-features strong {
  color: white;

  font-size: .96rem;
}


/* ========================================
   LOGIN CARD
======================================== */

.login-card {
  padding: 45px;

  color: var(--ink);

  background:
    rgba(
      255,
      255,
      255,
      .98
    );

  border:
    1px solid
    rgba(
      255,
      255,
      255,
      .12
    );

  border-radius: 28px;

  box-shadow:
    0 30px 80px
    rgba(
      0,
      0,
      0,
      .32
    );
}


.login-card-heading {
  margin-bottom: 30px;
}


.login-card-heading
.eyebrow {

  margin-bottom: 8px;
}


.login-card-heading h2 {
  margin: 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 2.7rem;

  font-weight: 500;

  line-height: 1.1;
}


.login-card-heading
> p:last-child {

  margin:
    10px 0 0;

  color:
    var(--muted);

  font-size: .9rem;
}


/* ========================================
   ALERT
======================================== */

.login-alert {
  margin-bottom: 20px;

  padding:
    13px 15px;

  color: #751d1d;

  background: #fde7e7;

  border:
    1px solid
    #f3b8b8;

  border-radius: 11px;

  font-size: .85rem;

  font-weight: 700;
}


/* ========================================
   FORM
======================================== */

.login-form {
  display: grid;

  gap: 21px;
}


.login-field {
  display: grid;

  gap: 7px;
}


.login-field label {
  color: #31392f;

  font-size: .79rem;

  font-weight: 800;
}


.password-label {
  display: flex;

  align-items: center;

  justify-content:
    space-between;
}


.password-label a {
  color:
    var(--green-dark);

  font-size: .75rem;

  font-weight: 800;
}


.password-label a:hover {
  text-decoration: underline;
}


/* ========================================
   INPUT
======================================== */

.input-wrap {
  height: 54px;

  display: flex;

  align-items: center;

  overflow: hidden;

  background: white;

  border:
    1px solid
    #d7ded0;

  border-radius: 12px;

  transition:
    border-color .2s ease,
    box-shadow .2s ease;
}


.input-wrap:focus-within {
  border-color:
    var(--green-dark);

  box-shadow:
    0 0 0 4px
    rgba(
      148,
      193,
      31,
      .13
    );
}


.input-wrap.input-error {
  border-color: #c64b4b;
}


.input-icon {
  flex: 0 0 45px;

  display: grid;

  place-items: center;

  color:
    var(--green-dark);

  font-weight: 900;
}


.input-wrap input {
  height: 100%;

  flex: 1;

  padding:
    0 10px 0 0;

  border: 0;

  border-radius: 0;

  box-shadow: none;
}


.input-wrap input:focus {
  border: 0;

  box-shadow: none;
}


/* ========================================
   PASSWORD TOGGLE
======================================== */

.password-toggle {
  height: 100%;

  padding:
    0 15px;

  color:
    var(--green-dark);

  background:
    transparent;

  border: 0;

  font-size: .75rem;

  font-weight: 850;
}


/* ========================================
   FIELD ERROR
======================================== */

.field-error {
  color: #b32d2d;

  font-size: .72rem;

  font-weight: 700;
}


/* ========================================
   REMEMBER
======================================== */

.remember-row {
  display: flex;

  grid-template-columns:
    unset;

  align-items: center;

  gap: 9px;

  width: fit-content;

  color:
    var(--muted);

  font-size: .79rem;

  font-weight: 600;

  cursor: pointer;
}


.remember-row input {
  width: 17px;
  height: 17px;

  margin: 0;

  accent-color:
    var(--green-dark);
}


/* ========================================
   LOGIN BUTTON
======================================== */

.login-button {
  position: relative;

  width: 100%;

  min-height: 55px;

  margin-top: 2px;

  border: 0;
}


.login-button:disabled {
  opacity: .75;

  cursor: not-allowed;

  transform: none;
}


.login-loading {
  display: inline-flex;

  align-items: center;

  gap: 10px;
}


.login-spinner {
  width: 18px;
  height: 18px;

  border:
    2px solid
    rgba(
      0,
      0,
      0,
      .25
    );

  border-top-color:
    var(--ink);

  border-radius: 50%;

  animation:
    loginSpin
    .7s
    linear
    infinite;
}


@keyframes loginSpin {

  to {
    transform:
      rotate(360deg);
  }

}


/* ========================================
   BOTTOM
======================================== */

.login-footer-text {
  display: flex;

  justify-content:
    center;

  gap: 5px;

  margin-top: 25px;

  color:
    var(--muted);

  font-size: .77rem;
}


.login-footer-text a {
  color:
    var(--green-dark);

  font-weight: 800;
}


.login-footer-text a:hover {
  text-decoration:
    underline;
}


/* ========================================
   RESPONSIVE
======================================== */

@media (
  max-width: 1020px
) {

  .login-container {
    grid-template-columns:
      1fr 470px;

    gap: 45px;
  }


  .login-card {
    padding: 38px;
  }

}


@media (
  max-width: 820px
) {

  .login-page {
    padding:
      110px 0 70px;
  }


  .login-container {
    grid-template-columns:
      1fr;
  }


  .login-intro {
    display: none;
  }


  .login-card {
    width:
      min(
        100%,
        520px
      );

    margin: auto;
  }

}


@media (
  max-width: 520px
) {

  .login-page {
    padding:
      95px 0 45px;
  }


  .login-card {
    padding:
      31px 22px;

    border-radius: 20px;
  }


  .login-card-heading h2 {
    font-size:
      2.25rem;
  }


  .login-footer-text {
    flex-direction:
      column;

    align-items:
      center;
  }

}
</style>