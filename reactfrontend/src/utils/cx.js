export const cx = value => typeof value === 'string' ? value : Object.entries(value || {}).filter(([,enabled])=>enabled).map(([name])=>name).join(' ')
