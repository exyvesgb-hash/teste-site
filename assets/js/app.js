
(function(){
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const brl=n=>Number(n).toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const get=p=>fetch(p,{cache:'no-cache'}).then(r=>{if(!r.ok)throw new Error('Não foi possível carregar '+p);return r.json()});
const wa=(num,msg)=>'https://wa.me/'+num+'?text='+encodeURIComponent(msg);
const SEM_FOTO='/assets/imoveis/sem-foto.svg';

function hydrate(site){
  document.querySelectorAll('[data-site]').forEach(el=>{if(site[el.dataset.site])el.textContent=site[el.dataset.site]});
  document.querySelectorAll('[data-wa]').forEach(el=>{const n=site['whatsapp_'+el.dataset.wa];if(n)el.href=wa(n,el.dataset.msg||'Olá! Vim pelo site e gostaria de atendimento.')});
  document.querySelectorAll('[data-tel]').forEach(el=>{if(site.telefone)el.href='tel:'+String(site.telefone).replace(/\D/g,'')});
  document.querySelectorAll('[data-link]').forEach(el=>{if(site[el.dataset.link])el.href=site[el.dataset.link]});
}
async function load(){
  const [site,d]=await Promise.all([get('data/site.json'),get('data/imoveis.json')]);
  hydrate(site);
  return {site,imoveis:(d.imoveis||[]).filter(i=>i.publicado!==false)};
}
const preco=i=>i.preco?brl(i.preco)+(i.finalidade==='Alugar'?'/mês':''):'Consulte';
const local=i=>[i.bairro,i.cidade].filter(Boolean).join(', ');
function specs(i){
  return [i.area>0&&i.area+' m²',i.quartos>0&&i.quartos+(i.quartos==1?' quarto':' quartos'),i.suites>0&&i.suites+(i.suites==1?' suíte':' suítes'),i.vagas>0&&i.vagas+(i.vagas==1?' vaga':' vagas')].filter(Boolean);
}
function card(i){
  const foto=(i.fotos&&i.fotos[0])||SEM_FOTO;
  const st=i.status&&i.status!=='Disponível'?'<span class="tag st">'+esc(i.status)+'</span>':'';
  return '<a class="card" href="imovel.html?c='+encodeURIComponent(i.codigo)+'"><figure><img src="'+esc(foto)+'" alt="'+esc(i.titulo)+'" loading="lazy"><div class="tags"><span class="tag">'+esc(i.finalidade)+'</span>'+st+'</div></figure><div class="corpo"><div class="preco">'+esc(preco(i))+'</div><h3>'+esc(i.titulo)+'</h3><div class="local">'+esc(local(i))+'</div><div class="specs">'+specs(i).map(s=>'<span>'+esc(s)+'</span>').join('')+'</div></div></a>';
}
const uniq=(arr,k)=>[...new Set(arr.map(x=>x[k]).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'pt-BR'));
window.Nnova={esc,brl,norm,load,card,preco,local,specs,wa,uniq,SEM_FOTO};
})();
