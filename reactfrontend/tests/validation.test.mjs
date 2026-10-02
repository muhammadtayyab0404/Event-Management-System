import test from 'node:test'
import assert from 'node:assert/strict'
import { validateField, validateDocuments, applicationBody, pakistanToday } from '../src/utils/validation.js'
test('contact validation allows ordinary punctuation and rejects markup',()=>{
 for(const [name,value] of [['name',"O’Connor"],['email','person+events@example.com'],['phone','+92 371 2250420'],['location','Shop 110, I-16/3']])assert.equal(validateField(name,value,{required:true}),'')
 assert.notEqual(validateField('message','<script>alert(1)</script>'),'')
 assert.notEqual(validateField('phone','123'),'')
 assert.notEqual(validateField('email','person@'),'')
 assert.notEqual(validateField('name','12345'),'')
})
test('meeting date and time use Pakistan time at the day boundary',()=>{
 const now=new Date('2026-09-28T20:00:00Z')
 assert.equal(pakistanToday(now),'2026-09-29')
 assert.notEqual(validateField('date','2026-09-28',{now}),'')
 assert.notEqual(validateField('time','00:30',{now,values:{date:'2026-09-29',time:'00:30'}}),'')
 assert.equal(validateField('time','02:00',{now,values:{date:'2026-09-29',time:'02:00'}}),'')
})
test('vendor checks IBAN checksum and document limits',()=>{
 assert.equal(validateField('iban','GB82 WEST 1234 5698 7654 32'),'')
 assert.notEqual(validateField('iban','GB00 WEST 1234 5698 7654 32'),'')
 assert.equal(validateDocuments([{name:'company.pdf',size:4096}]),'')
 assert.notEqual(validateDocuments([{name:'company.pdf',size:11*1024*1024}]),'')
 assert.notEqual(validateDocuments([{name:'program.exe',size:4096}]),'')
})
test('application email never includes bank or document data',()=>{
 const body=applicationBody('Vendor registration',{company:'Example',email:'hello@example.com',bank:'Secret Bank',account_title:'Secret Title',account_number:'123456789',iban:'SECRET',documents:'private.pdf',consent:true})
 assert.match(body,/Example/);assert.doesNotMatch(body,/Secret|123456789|SECRET|private.pdf|consent/)
})
