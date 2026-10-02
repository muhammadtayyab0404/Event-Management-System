import { writeFile } from 'node:fs/promises'
for (const [file, route] of Object.entries({events:'events',team:'team',vendor:'vendor',contact:'contact',crm:'crm',gallery:'events',packages:'contact'})) {
 await writeFile(`dist/${file}.html`, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=./index.html#/${route}"><title>RH Nexus Events</title></head><body><a href="./index.html#/${route}">Open ${route}</a><script>location.replace('./index.html#/${route}'+location.search)</script></body></html>`)
}
