<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()

const loading = ref(false)
const logoutLoading = ref(false)

const user = ref(null)

const stats = ref({
  events: 0,
  bookings: 0,
  enquiries: 0,
  packages: 0
})

const recentEnquiries = ref([])
const upcomingEvents = ref([])

const userName = computed(() => {
  return user.value?.name || 'Admin'
})

onMounted(async () => {
  document.title = 'Admin Dashboard | RH Nexus Events'

  /*
  |--------------------------------------------------------------------------
  | Load saved user
  |--------------------------------------------------------------------------
  */

  const savedUser = localStorage.getItem('user')

  if (savedUser) {
    try {
      user.value = JSON.parse(savedUser)
    } catch (error) {
      console.error('Unable to parse saved user:', error)
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Load dashboard data
  |--------------------------------------------------------------------------
  |
  | Jab backend dashboard endpoint ready ho:
  |
  | GET /api/dashboard
  |
  | response:
  |
  | {
  |   "stats": {...},
  |   "recent_enquiries": [...],
  |   "upcoming_events": [...]
  | }
  |
  */

  await loadDashboard()
})


const loadDashboard = async () => {
  loading.value = true

  try {
    /*
    |--------------------------------------------------------------------------
    | Future API
    |--------------------------------------------------------------------------
    |
    | Backend endpoint ready hone ke baad uncomment karna:
    |
    */

    // const response = await api.get('/dashboard')
    //
    // stats.value = response.data.stats
    // recentEnquiries.value =
    //   response.data.recent_enquiries || []
    //
    // upcomingEvents.value =
    //   response.data.upcoming_events || []


    /*
    |--------------------------------------------------------------------------
    | Temporary Demo Data
    |--------------------------------------------------------------------------
    */

    stats.value = {
      events: 12,
      bookings: 8,
      enquiries: 24,
      packages: 6
    }

    recentEnquiries.value = [
      {
        id: 1,
        name: 'Ali Ahmed',
        event: 'Wedding',
        date: '25 Aug 2026',
        status: 'New'
      },
      {
        id: 2,
        name: 'Sara Khan',
        event: 'Corporate Event',
        date: '29 Aug 2026',
        status: 'Pending'
      },
      {
        id: 3,
        name: 'Hamza Malik',
        event: 'Birthday',
        date: '02 Sep 2026',
        status: 'Contacted'
      }
    ]

    upcomingEvents.value = [
      {
        id: 1,
        title: 'Wedding Reception',
        client: 'Ali Ahmed',
        date: '25 Aug 2026',
        location: 'Islamabad'
      },
      {
        id: 2,
        title: 'Corporate Dinner',
        client: 'Nexus Technologies',
        date: '29 Aug 2026',
        location: 'Islamabad'
      }
    ]

  } catch (error) {
    console.error(
      'Dashboard Error:',
      error.response?.data || error
    )

    if (
      error.response?.status === 401 ||
      error.response?.status === 419
    ) {
      await router.push('/login')
    }

  } finally {
    loading.value = false
  }
}


/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/

const logout = async () => {
  logoutLoading.value = true

  try {

    /*
    | Fortify prefix = api
    |
    | POST /api/logout
    */

    await api.post('/logout')

  } catch (error) {

    console.error(
      'Logout Error:',
      error.response?.data || error
    
    )

  } finally {

    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')

    logoutLoading.value = false

    await router.push('/login')
  }
}
</script>


<template>
  <main
    id="main"
    class="dashboard-page"
  >

    <!-- ========================================
         DASHBOARD HEADER
    ========================================= -->

    <section class="dashboard-hero">

      <div class="container dashboard-hero-inner">

        <div>

          <p class="dashboard-eyebrow">
            Admin Dashboard
          </p>

          <h1>
            Welcome back,
            <span>
              {{ userName }}
            </span>
          </h1>

          <p>
            Manage RH Nexus Events, bookings,
            enquiries and packages from one place.
          </p>

        </div>


        <button
          type="button"
          class="logout-button"
          :disabled="logoutLoading"
          @click="logout"
        >

          {{
            logoutLoading
              ? 'Signing out...'
              : 'Logout'
          }}

        </button>

      </div>

    </section>



    <!-- ========================================
         CONTENT
    ========================================= -->

    <section class="dashboard-content">

      <div class="container">

        <!-- ========================================
             STATS
        ========================================= -->

        <div class="stats-grid">

          <article class="stat-card">

            <div class="stat-icon">
              EV
            </div>

            <div>
              <span>
                Total Events
              </span>

              <strong>
                {{ stats.events }}
              </strong>
            </div>

          </article>


          <article class="stat-card">

            <div class="stat-icon">
              BK
            </div>

            <div>
              <span>
                Bookings
              </span>

              <strong>
                {{ stats.bookings }}
              </strong>
            </div>

          </article>


          <article class="stat-card">

            <div class="stat-icon">
              EN
            </div>

            <div>
              <span>
                Enquiries
              </span>

              <strong>
                {{ stats.enquiries }}
              </strong>
            </div>

          </article>


          <article class="stat-card">

            <div class="stat-icon">
              PK
            </div>

            <div>
              <span>
                Packages
              </span>

              <strong>
                {{ stats.packages }}
              </strong>
            </div>

          </article>

        </div>



        <!-- ========================================
             QUICK ACTIONS
        ========================================= -->

        <div class="dashboard-section">

          <div class="section-heading">

            <div>

              <p class="dashboard-eyebrow">
                Management
              </p>

              <h2>
                Quick actions
              </h2>

            </div>

          </div>


          <div class="actions-grid">

            <RouterLink
              to="/dashboard/events"
              class="action-card"
            >

              <span class="action-number">
                01
              </span>

              <h3>
                Events
              </h3>

              <p>
                Create, edit and manage
                upcoming events.
              </p>

              <strong>
                Manage Events →
              </strong>

            </RouterLink>


            <RouterLink
              to="/dashboard/bookings"
              class="action-card"
            >

              <span class="action-number">
                02
              </span>

              <h3>
                Bookings
              </h3>

              <p>
                Review confirmed and
                pending bookings.
              </p>

              <strong>
                View Bookings →
              </strong>

            </RouterLink>


            <RouterLink
              to="/dashboard/enquiries"
              class="action-card"
            >

              <span class="action-number">
                03
              </span>

              <h3>
                Enquiries
              </h3>

              <p>
                Manage customer messages
                and event requests.
              </p>

              <strong>
                View Enquiries →
              </strong>

            </RouterLink>


            <RouterLink
              to="/dashboard/packages"
              class="action-card"
            >

              <span class="action-number">
                04
              </span>

              <h3>
                Packages
              </h3>

              <p>
                Create and update event
                packages and pricing.
              </p>

              <strong>
                Manage Packages →
              </strong>

            </RouterLink>

          </div>

        </div>



        <!-- ========================================
             TABLES
        ========================================= -->

        <div class="dashboard-columns">

          <!-- Recent Enquiries -->

          <section class="dashboard-panel">

            <div class="panel-heading">

              <div>

                <p class="dashboard-eyebrow">
                  Customers
                </p>

                <h2>
                  Recent enquiries
                </h2>

              </div>


              <RouterLink
                to="/dashboard/enquiries"
              >
                View all
              </RouterLink>

            </div>


            <div
              v-if="loading"
              class="dashboard-loading"
            >
              Loading...
            </div>


            <div
              v-else-if="recentEnquiries.length"
              class="table-wrap"
            >

              <table>

                <thead>
                  <tr>
                    <th>
                      Client
                    </th>

                    <th>
                      Event
                    </th>

                    <th>
                      Date
                    </th>

                    <th>
                      Status
                    </th>
                  </tr>
                </thead>


                <tbody>

                  <tr
                    v-for="enquiry in recentEnquiries"
                    :key="enquiry.id"
                  >

                    <td>
                      <strong>
                        {{ enquiry.name }}
                      </strong>
                    </td>

                    <td>
                      {{ enquiry.event }}
                    </td>

                    <td>
                      {{ enquiry.date }}
                    </td>

                    <td>

                      <span
                        class="status-badge"
                        :class="
                          `status-${enquiry.status.toLowerCase()}`
                        "
                      >
                        {{ enquiry.status }}
                      </span>

                    </td>

                  </tr>

                </tbody>

              </table>

            </div>


            <div
              v-else
              class="empty-state"
            >
              No enquiries found.
            </div>

          </section>



          <!-- Upcoming Events -->

          <section class="dashboard-panel">

            <div class="panel-heading">

              <div>

                <p class="dashboard-eyebrow">
                  Schedule
                </p>

                <h2>
                  Upcoming events
                </h2>

              </div>


              <RouterLink
                to="/dashboard/events"
              >
                View all
              </RouterLink>

            </div>


            <div
              v-if="upcomingEvents.length"
              class="event-list"
            >

              <article
                v-for="event in upcomingEvents"
                :key="event.id"
                class="event-item"
              >

                <div class="event-date">

                  <span>
                    {{ event.date }}
                  </span>

                </div>


                <div class="event-info">

                  <h3>
                    {{ event.title }}
                  </h3>

                  <p>
                    {{ event.client }}
                  </p>

                  <small>
                    {{ event.location }}
                  </small>

                </div>

              </article>

            </div>


            <div
              v-else
              class="empty-state"
            >
              No upcoming events.
            </div>

          </section>

        </div>

      </div>

    </section>

  </main>
</template>


<style scoped>

/* ========================================
   PAGE
======================================== */

.dashboard-page {
  min-height: 100vh;
  background: #f5f7f2;
}


/* ========================================
   HERO
======================================== */

.dashboard-hero {
  padding:
    145px 0 65px;

  color: white;

  background:
    radial-gradient(
      circle at 85% 20%,
      rgba(148, 193, 31, .15),
      transparent 25%
    ),
    linear-gradient(
      135deg,
      #070a07,
      #111811
    );
}


.dashboard-hero-inner {
  display: flex;

  align-items: flex-end;

  justify-content:
    space-between;

  gap: 40px;
}


.dashboard-eyebrow {
  margin:
    0 0 8px;

  color:
    var(--green);

  font-size: .72rem;

  font-weight: 900;

  letter-spacing: .18em;

  text-transform:
    uppercase;
}


.dashboard-hero h1 {
  margin: 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size:
    clamp(
      2.8rem,
      5vw,
      4.8rem
    );

  font-weight: 500;

  line-height: 1;
}


.dashboard-hero h1 span {
  color:
    var(--green);
}


.dashboard-hero
.dashboard-hero-inner
> div
> p:last-child {

  max-width: 620px;

  margin:
    20px 0 0;

  color:
    rgba(
      255,
      255,
      255,
      .62
    );
}


/* ========================================
   LOGOUT
======================================== */

.logout-button {
  min-width: 130px;

  min-height: 46px;

  padding:
    0 22px;

  color: white;

  background:
    transparent;

  border:
    1px solid
    rgba(
      255,
      255,
      255,
      .35
    );

  border-radius:
    999px;

  font-weight: 800;

  cursor: pointer;

  transition:
    background .2s ease,
    color .2s ease,
    border-color .2s ease;
}


.logout-button:hover {
  color:
    var(--ink);

  background:
    var(--green);

  border-color:
    var(--green);
}


.logout-button:disabled {
  opacity: .6;

  cursor:
    not-allowed;
}


/* ========================================
   CONTENT
======================================== */

.dashboard-content {
  padding:
    50px 0 90px;
}


/* ========================================
   STATS
======================================== */

.stats-grid {
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 20px;

  margin-top:
    -85px;

  margin-bottom:
    45px;
}


.stat-card {
  min-height: 135px;

  display: flex;

  align-items: center;

  gap: 18px;

  padding: 25px;

  background: white;

  border:
    1px solid
    #e3e8de;

  border-radius: 20px;

  box-shadow:
    0 15px 45px
    rgba(
      5,
      10,
      5,
      .07
    );
}


.stat-icon {
  flex: 0 0 52px;

  width: 52px;
  height: 52px;

  display: grid;

  place-items: center;

  color:
    var(--ink);

  background:
    var(--green);

  border-radius:
    15px;

  font-size:
    .75rem;

  font-weight:
    900;
}


.stat-card > div:last-child {
  display: grid;

  gap: 3px;
}


.stat-card span {
  color:
    #70786b;

  font-size:
    .76rem;

  font-weight:
    750;

  text-transform:
    uppercase;
}


.stat-card strong {
  color:
    var(--ink);

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size:
    2.2rem;

  font-weight:
    500;
}


/* ========================================
   SECTIONS
======================================== */

.dashboard-section {
  margin-bottom:
    45px;
}


.section-heading,
.panel-heading {
  display: flex;

  align-items:
    flex-end;

  justify-content:
    space-between;

  gap: 20px;

  margin-bottom:
    20px;
}


.section-heading h2,
.panel-heading h2 {
  margin: 0;

  color:
    var(--ink);

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size:
    2rem;

  font-weight:
    500;
}


/* ========================================
   QUICK ACTIONS
======================================== */

.actions-grid {
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 18px;
}


.action-card {
  position: relative;

  min-height: 220px;

  display: flex;

  flex-direction:
    column;

  padding: 25px;

  color:
    var(--ink);

  background: white;

  border:
    1px solid
    #e3e8de;

  border-radius:
    18px;

  transition:
    transform .2s ease,
    border-color .2s ease,
    box-shadow .2s ease;
}


.action-card:hover {
  transform:
    translateY(-5px);

  border-color:
    var(--green);

  box-shadow:
    0 18px 45px
    rgba(
      5,
      10,
      5,
      .09
    );
}


.action-number {
  color:
    var(--green-dark);

  font-size:
    .72rem;

  font-weight:
    900;

  letter-spacing:
    .15em;
}


.action-card h3 {
  margin:
    25px 0 8px;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size:
    1.45rem;

  font-weight:
    500;
}


.action-card p {
  margin:
    0 0 25px;

  color:
    #747c70;

  font-size:
    .86rem;

  line-height:
    1.65;
}


.action-card strong {
  margin-top: auto;

  color:
    var(--green-dark);

  font-size:
    .78rem;
}


/* ========================================
   COLUMNS
======================================== */

.dashboard-columns {
  display: grid;

  grid-template-columns:
    1.4fr .8fr;

  gap: 22px;
}


/* ========================================
   PANEL
======================================== */

.dashboard-panel {
  padding: 26px;

  background: white;

  border:
    1px solid
    #e3e8de;

  border-radius:
    20px;
}


.panel-heading a {
  color:
    var(--green-dark);

  font-size:
    .78rem;

  font-weight:
    800;
}


/* ========================================
   TABLE
======================================== */

.table-wrap {
  overflow-x:
    auto;
}


table {
  width: 100%;

  border-collapse:
    collapse;
}


th {
  padding:
    13px 12px;

  color:
    #777f72;

  background:
    #f6f8f3;

  text-align:
    left;

  font-size:
    .69rem;

  letter-spacing:
    .06em;

  text-transform:
    uppercase;
}


td {
  padding:
    15px 12px;

  color:
    #596052;

  border-bottom:
    1px solid
    #edf0e9;

  font-size:
    .8rem;
}


td strong {
  color:
    var(--ink);
}


/* ========================================
   STATUS
======================================== */

.status-badge {
  display:
    inline-flex;

  align-items:
    center;

  min-height:
    25px;

  padding:
    0 9px;

  border-radius:
    999px;

  font-size:
    .67rem;

  font-weight:
    800;
}


.status-new {
  color:
    #496900;

  background:
    #e9f6c7;
}


.status-pending {
  color:
    #856100;

  background:
    #fff3c2;
}


.status-contacted {
  color:
    #315b82;

  background:
    #e4effa;
}


/* ========================================
   EVENTS
======================================== */

.event-list {
  display: grid;

  gap: 12px;
}


.event-item {
  display: flex;

  gap: 15px;

  padding:
    15px;

  background:
    #f7f9f5;

  border:
    1px solid
    #e8ece4;

  border-radius:
    14px;
}


.event-date {
  flex:
    0 0 92px;

  display: grid;

  place-items:
    center;

  padding:
    8px;

  color:
    var(--ink);

  background:
    var(--green);

  border-radius:
    11px;

  text-align:
    center;

  font-size:
    .68rem;

  font-weight:
    900;
}


.event-info h3 {
  margin:
    0 0 4px;

  color:
    var(--ink);

  font-size:
    .92rem;
}


.event-info p {
  margin:
    0 0 3px;

  color:
    #646d60;

  font-size:
    .77rem;
}


.event-info small {
  color:
    #939a90;

  font-size:
    .69rem;
}


/* ========================================
   STATES
======================================== */

.dashboard-loading,
.empty-state {
  padding:
    35px 15px;

  color:
    #777f72;

  text-align:
    center;

  font-size:
    .85rem;
}


/* ========================================
   RESPONSIVE
======================================== */

@media (
  max-width: 1050px
) {

  .stats-grid,
  .actions-grid {
    grid-template-columns:
      repeat(2, 1fr);
  }


  .dashboard-columns {
    grid-template-columns:
      1fr;
  }

}


@media (
  max-width: 700px
) {

  .dashboard-hero {
    padding:
      115px 0 80px;
  }


  .dashboard-hero-inner {
    align-items:
      flex-start;

    flex-direction:
      column;
  }


  .stats-grid {
    margin-top:
      -65px;
  }

}


@media (
  max-width: 560px
) {

  .stats-grid,
  .actions-grid {
    grid-template-columns:
      1fr;
  }


  .dashboard-content {
    padding-bottom:
      60px;
  }


  .dashboard-panel {
    padding:
      20px 15px;
  }


  .event-date {
    flex-basis:
      76px;
  }

}
</style>