import Store from '../store';
export const dynamic='force-dynamic';
export default async function Page({params}:{params:Promise<{path?:string[]}>}){const p=await params;return <Store path={'/'+(p.path||[]).join('/')}/>}
