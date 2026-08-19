<script setup>
import { onMounted } from 'vue'
import site from '@/data/siteData'
import { useReveal } from '@/composables/useReveal'

useReveal()

onMounted(() => {
  document.title =
    'RH Nexus Events | Catering & Event Experiences'

  const description =
    'RH Nexus Events provides professional catering and event experiences in Islamabad for weddings, corporate gatherings and private celebrations.'

  let metaDescription =
    document.querySelector(
      'meta[name="description"]'
    )

  if (!metaDescription) {
    metaDescription =
      document.createElement('meta')

    metaDescription.setAttribute(
      'name',
      'description'
    )

    document.head.appendChild(
      metaDescription
    )
  }

  metaDescription.setAttribute(
    'content',
    description
  )
})
</script>

<template>
  <main id="main">

    <!-- ========================================
         HERO / HOME
    ========================================= -->
    <section
      id="home"
      class="hero"
      aria-labelledby="hero-title"
    >
      <div
        class="hero-media"
        aria-hidden="true"
      ></div>

      <div
        class="hero-overlay"
        aria-hidden="true"
      ></div>

      <div class="container hero-content">

        <p class="eyebrow hero-eyebrow">
          Premium Catering & Event Experiences
        </p>

        <h1 id="hero-title">
          Every gathering deserves an
          <span>
            unforgettable taste.
          </span>
        </h1>

        <p class="hero-copy">
          From elegant weddings to polished
          corporate events, RH Nexus Events
          brings thoughtful presentation,
          flavour and seamless service to
          your celebration.
        </p>

        <div class="hero-actions">

          <RouterLink
            class="btn btn-primary"
            to="/contact"
          >
            Get a Quote
          </RouterLink>

          <RouterLink
            class="btn btn-ghost"
            to="/packages"
          >
            View Packages
          </RouterLink>

        </div>

        <div
          class="hero-meta"
          aria-label="Highlights"
        >
          <div>
            <strong>
              Tailored
            </strong>

            <span>
              Event Menus
            </span>
          </div>

          <div>
            <strong>
              Elegant
            </strong>

            <span>
              Presentation
            </span>
          </div>

          <div>
            <strong>
              Reliable
            </strong>

            <span>
              Service
            </span>
          </div>
        </div>

      </div>

      <!-- Direct same page anchor -->
      <a
        class="scroll-cue"
        href="#about"
        aria-label="Scroll to about section"
      >
        <span></span>
      </a>

    </section>


    <!-- ========================================
         BRAND STRIP
    ========================================= -->
    <section
      class="intro-strip"
      aria-label="Brand promise"
    >
      <div class="container intro-strip-inner">

        <span>
          Connect
        </span>

        <i></i>

        <span>
          Create
        </span>

        <i></i>

        <span>
          Celebrate
        </span>

      </div>
    </section>


    <!-- ========================================
         ABOUT
    ========================================= -->
    <section
      id="about"
      class="section about"
    >
      <div class="container about-grid">

        <div class="about-image reveal">

          <img
            src="../assets/images/about-catering.webp"
            width="920"
            height="1100"
            loading="lazy"
            decoding="async"
            alt="Elegant catered buffet arranged for an event"
          >

          <div class="about-badge">

            <strong>
              RH
            </strong>

            <span>
              Details make
              <br>
              the difference
            </span>

          </div>
        </div>


        <div class="about-content reveal">

          <p class="eyebrow">
            About RH Nexus Events
          </p>

          <h2>
            Beautiful events,
            thoughtfully brought together.
          </h2>

          <p class="lead">
            We create catering experiences
            that feel polished, welcoming
            and personal—from the first
            conversation to the final plate.
          </p>

          <p>
            Our focus is simple: understand
            your occasion, match the food and
            presentation to your vision, and
            deliver a smooth experience your
            guests will remember.
          </p>


          <div class="feature-list">

            <div>

              <span class="check">
                ✓
              </span>

              <p>
                <strong>
                  Personalised planning
                </strong>

                <br>

                Service shaped around your
                event and guest needs.
              </p>

            </div>


            <div>

              <span class="check">
                ✓
              </span>

              <p>
                <strong>
                  Refined presentation
                </strong>

                <br>

                Food displays designed to
                complement the atmosphere.
              </p>

            </div>


            <div>

              <span class="check">
                ✓
              </span>

              <p>
                <strong>
                  Careful coordination
                </strong>

                <br>

                Clear communication and
                dependable event-day service.
              </p>

            </div>

          </div>


          <RouterLink
            class="text-link"
            to="/contact"
          >
            Discuss your event

            <span>
              →
            </span>
          </RouterLink>

        </div>

      </div>
    </section>


    <!-- ========================================
         SERVICES
    ========================================= -->
    <section
      id="services"
      class="section services"
    >
      <div class="container">

        <div class="section-heading reveal">

          <div>

            <p class="eyebrow">
              Our Services
            </p>

            <h2>
              Catering made for every
              kind of occasion.
            </h2>

          </div>

          <p>
            Flexible service, memorable
            presentation and an experience
            designed around the way you
            want to celebrate.
          </p>

        </div>


        <div class="service-grid">

          <!-- Wedding -->
          <article
            class="service-card reveal"
          >
            <img
              src="../assets/images/wedding-catering.webp"
              width="1000"
              height="760"
              loading="lazy"
              decoding="async"
              alt="Wedding buffet with floral decoration"
            >

            <div
              class="service-shade"
            ></div>

            <div class="service-copy">

              <span>
                01
              </span>

              <h3>
                Wedding Catering
              </h3>

              <p>
                Elegant food displays and
                attentive service for your
                most meaningful day.
              </p>

              <RouterLink
                :to="{
                  path: '/contact',
                  query: {
                    event: 'Wedding'
                  }
                }"
                aria-label="Ask about wedding catering"
              >
                Enquire

                <b>
                  →
                </b>
              </RouterLink>

            </div>
          </article>


          <!-- Corporate -->
          <article
            class="service-card reveal"
          >
            <img
              src="../assets/images/corporate-catering.webp"
              width="1000"
              height="760"
              loading="lazy"
              decoding="async"
              alt="Pastries and sandwiches prepared for a corporate gathering"
            >

            <div
              class="service-shade"
            ></div>

            <div class="service-copy">

              <span>
                02
              </span>

              <h3>
                Corporate Events
              </h3>

              <p>
                Professional catering for
                meetings, launches,
                conferences and team occasions.
              </p>

              <RouterLink
                :to="{
                  path: '/contact',
                  query: {
                    event: 'Corporate Event'
                  }
                }"
                aria-label="Ask about corporate catering"
              >
                Enquire

                <b>
                  →
                </b>
              </RouterLink>

            </div>
          </article>


          <!-- Buffet -->
          <article
            class="service-card reveal"
          >
            <img
              src="../assets/images/buffet-service.webp"
              width="1000"
              height="760"
              loading="lazy"
              decoding="async"
              alt="Premium outdoor buffet with varied dishes"
            >

            <div
              class="service-shade"
            ></div>

            <div class="service-copy">

              <span>
                03
              </span>

              <h3>
                Buffet Experiences
              </h3>

              <p>
                Beautifully arranged
                selections that let guests
                dine comfortably and freely.
              </p>

              <RouterLink
                to="/contact"
                aria-label="Ask about buffet catering"
              >
                Enquire

                <b>
                  →
                </b>
              </RouterLink>

            </div>
          </article>


          <!-- Private -->
          <article
            class="service-card reveal"
          >
            <img
              src="../assets/images/dessert-table.webp"
              width="1000"
              height="760"
              loading="lazy"
              decoding="async"
              alt="Dessert table with individual treats at an event"
            >

            <div
              class="service-shade"
            ></div>

            <div class="service-copy">

              <span>
                04
              </span>

              <h3>
                Private Celebrations
              </h3>

              <p>
                Birthdays, engagements
                and family gatherings with
                a special finishing touch.
              </p>

              <RouterLink
                :to="{
                  path: '/contact',
                  query: {
                    event: 'Private Gathering'
                  }
                }"
                aria-label="Ask about private event catering"
              >
                Enquire

                <b>
                  →
                </b>
              </RouterLink>

            </div>
          </article>

        </div>

      </div>
    </section>


    <!-- ========================================
         WHY CHOOSE US
    ========================================= -->
    <section class="section why-us">

      <div class="container why-grid">

        <div class="why-copy reveal">

          <p class="eyebrow">
            Why Choose Us
          </p>

          <h2>
            Good food is only
            the beginning.
          </h2>

          <p>
            Your event should feel effortless.
            We pay attention to the details
            that help everything look composed,
            feel welcoming and run smoothly.
          </p>

          <RouterLink
            class="btn btn-primary"
            to="/contact"
          >
            Request a Quote
          </RouterLink>

        </div>


        <div class="why-points">

          <article class="reveal">

            <span>
              01
            </span>

            <div>

              <h3>
                Made for your occasion
              </h3>

              <p>
                Every enquiry starts with
                your event, your guests and
                the experience you want to create.
              </p>

            </div>

          </article>


          <article class="reveal">

            <span>
              02
            </span>

            <div>

              <h3>
                Presentation with purpose
              </h3>

              <p>
                Food and styling work together,
                giving your gathering a cohesive,
                premium feel.
              </p>

            </div>

          </article>


          <article class="reveal">

            <span>
              03
            </span>

            <div>

              <h3>
                Service you can rely on
              </h3>

              <p>
                Responsive coordination helps
                you stay confident from planning
                through event day.
              </p>

            </div>

          </article>

        </div>

      </div>
    </section>


    <!-- ========================================
         GALLERY
    ========================================= -->
    <section
      id="gallery"
      class="section gallery"
    >
      <div class="container">

        <div class="section-heading reveal">

          <div>

            <p class="eyebrow">
              Our Gallery
            </p>

            <h2>
              A taste of our
              completed events.
            </h2>

          </div>


          <div class="section-heading-action">

            <p>
              Explore recent setups,
              buffets, dessert tables
              and event details from our work.
            </p>

            <RouterLink
              class="btn btn-primary"
              to="/gallery"
            >
              See More Projects
            </RouterLink>

          </div>

        </div>


        <div class="gallery-grid">

          <figure class="reveal">

            <img
              src="../assets/images/gallery-1.webp"
              width="900"
              height="680"
              loading="lazy"
              decoding="async"
              alt="Wedding buffet project"
            >

          </figure>


          <figure class="reveal">

            <img
              src="../assets/images/gallery-2.webp"
              width="900"
              height="680"
              loading="lazy"
              decoding="async"
              alt="Corporate catering project"
            >

          </figure>


          <figure class="reveal">

            <img
              src="../assets/images/gallery-3.webp"
              width="900"
              height="680"
              loading="lazy"
              decoding="async"
              alt="Outdoor buffet project"
            >

          </figure>


          <figure
            class="gallery-wide reveal"
          >

            <img
              src="../assets/images/gallery-4.webp"
              width="900"
              height="680"
              loading="lazy"
              decoding="async"
              alt="Dessert table project"
            >

          </figure>

        </div>


        <div
          class="mobile-gallery-action reveal"
        >
          <RouterLink
            class="btn btn-primary"
            to="/gallery"
          >
            See More Projects
          </RouterLink>
        </div>

      </div>
    </section>


    <!-- ========================================
         PACKAGES CTA
    ========================================= -->
    <section class="cta-section">

      <div
        class="container cta-inner reveal"
      >

        <img
          src="../assets/images/logo-round-transparent.png"
          width="180"
          height="180"
          loading="lazy"
          decoding="async"
          alt="RH Nexus Events monogram"
        >


        <div>

          <p class="eyebrow">
            Packages for every occasion
          </p>

          <h2>
            Choose a starting point,
            then make it yours.
          </h2>

        </div>


        <RouterLink
          class="btn btn-light"
          to="/packages"
        >
          Explore Packages
        </RouterLink>

      </div>

    </section>


    <!-- ========================================
         QUICK CONTACT
    ========================================= -->
    <section
      class="section home-contact"
      aria-labelledby="home-contact-title"
    >
      <div class="container">

        <div
          class="home-contact-card reveal"
        >

          <div class="home-contact-copy">

            <p class="eyebrow">
              Quick Contact
            </p>

            <h2 id="home-contact-title">
              Ready to plan your event?
            </h2>

            <p>
              Call, message or email us
              for availability, menu options
              and a personalised quotation.
            </p>

          </div>


          <div class="quick-contact-links">

            <a
              :href="`tel:${site.primary_phone_tel}`"
            >
              <span>
                Phone
              </span>

              <strong>
                {{ site.primary_phone_display }}
              </strong>
            </a>


            <a
              :href="site.whatsapp_url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                WhatsApp
              </span>

              <strong>
                {{ site.whatsapp_phone_display }}
              </strong>
            </a>


            <a
              :href="`mailto:${site.email}`"
            >
              <span>
                Email
              </span>

              <strong>
                {{ site.email }}
              </strong>
            </a>

          </div>


          <RouterLink
            class="btn btn-primary"
            to="/contact"
          >
            Get a Quote
          </RouterLink>

        </div>

      </div>
    </section>

  </main>
</template>