const whatsappNumber = '923281620789'

const whatsappMessage = encodeURIComponent(
  'Hello RH Nexus Events, I would like to discuss an event.'
)

const address =
  'Street no 17, Shop no 110, Sector I-16/3, Islamabad, Pakistan 44000'

const siteData = {
  name: 'RH Nexus Events',

  email: 'rhnexusevents@gmail.com',

  primary_phone_display: '+92 341 6963339',
  primary_phone_tel: '+923416963339',

  whatsapp_phone_display: '+92 328 1620789',
  whatsapp_phone_tel: '+923281620789',
  whatsapp_number: whatsappNumber,

  address,

  hours: 'Monday – Sunday: 10:00 AM – 10:00 PM',

  facebook:
    'https://www.facebook.com/profile.php?id=61591578887658',

  instagram:
    'https://www.instagram.com/rh_nexus_events/',

  whatsapp_url:
    `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,

  map_url:
    `https://www.google.com/maps?q=${encodeURIComponent(address)}`,

  map_embed_url:
    `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`
}

export default siteData