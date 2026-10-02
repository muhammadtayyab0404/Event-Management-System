export function pakistanToday(now=new Date()) {
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Karachi',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now)
 const get=type=>parts.find(p=>p.type===type).value
 return `${get('year')}-${get('month')}-${get('day')}`
}
export function validIban(value) {
 const iban=value.replace(/\s/g,'').toUpperCase()
 if(!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(iban))return false
 let remainder=0
 for(const c of iban.slice(4)+iban.slice(0,4)) {
  const digits=/[A-Z]/.test(c)?String(c.charCodeAt(0)-55):c
  for(const n of digits)remainder=(remainder*10+Number(n))%97
 }
 return remainder===1
}
export function validateField(name, raw, {required=false, values={}, now=new Date()}={}) {
 const value=String(raw??'').trim()
 if(required&&!value)return 'Please complete this field.'
 if(!value)return ''
 const max=['message','additional_info'].includes(name)?3000:200
 if(value.length>max)return `Please use no more than ${max} characters.`
 if(/[<>{}`\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(value))return 'Please remove markup symbols such as < > { } or backticks.'
 if(['name','contact_name','account_title'].includes(name)&&(!/^[\p{L}\p{M} .’'\-]+$/u.test(value)||value.length<2||!/[\p{L}]/u.test(value)))return 'Use letters, spaces, apostrophes or hyphens for this name.'
 if(name==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))return 'Enter a valid email address.'
 if(name==='phone'&&(!/^\+?[0-9\s().-]+$/.test(value)||value.replace(/\D/g,'').length<7||value.replace(/\D/g,'').length>15))return 'Use 7 to 15 digits with an optional country code.'
 if(['company','bank'].includes(name)&&value.length<2)return 'Enter at least two characters.'
 if(name==='location'&&value.length<3)return 'Enter a meeting location using at least three characters.'
 if(name==='message'&&value.length<10)return 'Please add at least 10 characters so we can understand your request.'
 if(name==='account_number'&&!/^[0-9 -]{5,34}$/.test(value))return 'Use 5 to 34 characters: digits, spaces or hyphens only.'
 if(name==='registration'&&!/^[\p{L}\p{N} /.-]+$/u.test(value))return 'Use letters, numbers, spaces, hyphens, dots or slashes.'
 if(name==='iban'&&!validIban(value))return 'Please enter a valid IBAN, including its correct check digits.'
 if(name==='event_type'&&!['Corporate','Wedding','Social event','Parties','Other'].includes(value))return 'Select a valid event type.'
 if(name==='category'&&!['Photography','Restaurant','Marriage hall','Caterer','Decor','Other'].includes(value))return 'Select a valid category.'
 if(name==='date') {
  if(!/^\d{4}-\d{2}-\d{2}$/.test(value)||Number.isNaN(Date.parse(value+'T00:00:00Z')))return 'Choose a valid date.'
  if(value<pakistanToday(now))return 'Choose today or a future date.'
 }
 if(name==='time'&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(value))return 'Choose a valid time.'
 if((name==='date'||name==='time')&&values.date&&values.time) {
  const time=new Date(`${values.date}T${values.time}:00+05:00`).getTime()
  if(!Number.isFinite(time)||time<=now.getTime())return 'Choose a future meeting date and time (Pakistan time).'
 }
 return ''
}
export function validateDocuments(files) {
 if(files.some(file=>file.size>10*1024*1024||!(/\.(pdf|jpe?g|png)$/i.test(file.name))))return 'Please select PDF, JPG or PNG files no larger than 10 MB each.'
 return ''
}
export function applicationBody(kind,values) {
 const excluded=new Set(['consent'])
 if(kind==='Vendor registration')for(const key of ['documents','bank','account_title','account_number','iban'])excluded.add(key)
 return Object.entries(values).filter(([key])=>!excluded.has(key)).map(([key,value])=>`${key.replaceAll('_',' ')}: ${String(value).trim()}`).join('\n')
}
