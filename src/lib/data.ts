import { configured, supabase } from './supabase'
import type { Event, Registration } from '../types'
export const demoEvents: Event[] = [
 {id:'hack-2026',title:'Hack The Hive 2026',category:'Hackathon',date:'2026-10-18',time:'09:00',venue:'Innovation Lab',description:'A 24-hour build sprint for students who want to turn promising ideas into working prototypes.',featured:true,registration_open:true,capacity:120},
 {id:'design-jam',title:'Design Systems Jam',category:'Workshop',date:'2026-10-08',time:'14:00',venue:'Studio 04',description:'Build a practical visual language with components, type, and ruthless consistency.',featured:false,registration_open:true,capacity:40},
 {id:'ai-panel',title:'Applied AI Panel',category:'Talk',date:'2026-10-12',time:'17:30',venue:'Main Auditorium',description:'Founders and researchers unpack where AI is genuinely useful, and where it is merely loud.',featured:false,registration_open:true,capacity:200},
 {id:'open-mic',title:'Open Source Open Mic',category:'Community',date:'2026-10-25',time:'16:00',venue:'Courtyard',description:'Bring a project, find collaborators, or take the mic to share a lesson with the community.',featured:false,registration_open:false,capacity:80}
]
export async function getEvents(){ if(!configured)return demoEvents; const {data,error}=await supabase.from('events').select('*').order('date'); if(error)throw error; return data as Event[] }
export async function getRegistrations(){if(!configured)return [] as Registration[]; const {data,error}=await supabase.from('registrations').select('*, events(title)').order('created_at',{ascending:false});if(error)throw error;return data as Registration[]}
