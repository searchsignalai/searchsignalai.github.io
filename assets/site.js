document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([...document.querySelectorAll("[data-include]")].map(async el => {
    try { const r = await fetch(`/partials/${el.dataset.include}.html`); if (!r.ok) throw Error(r.status); el.innerHTML = await r.text(); }
    catch (e) { console.error("Shared component could not load:", e); }
  }));
  const toggle = document.getElementById("menuToggle"), nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => { const open = nav.classList.toggle("open"); toggle.setAttribute("aria-expanded", String(open)); });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }));
  }
  const topics = {
    seo: ["01 / DISCOVER","Search Engine Optimization","Help search engines discover, crawl and understand your content.","/seo.html","Explore SEO"],
    aeo: ["02 / ANSWER","Answer Engine Optimization","Structure useful information so answer engines can identify clear responses.","/aeo.html","Explore AEO"],
    geo: ["03 / RECOMMEND","Generative Engine Optimization","Make information clear, verifiable and useful in generative search experiences.","/geo.html","Explore GEO"]
  };
  document.querySelectorAll(".node").forEach(node => node.addEventListener("click", () => {
    const t = topics[node.dataset.topic]; if (!t) return;
    document.querySelectorAll(".node").forEach(n => n.classList.toggle("active", n === node));
    document.getElementById("infoLabel").textContent = t[0]; document.getElementById("infoTitle").textContent = t[1];
    document.getElementById("infoText").textContent = t[2]; const link = document.getElementById("infoLink"); link.href = t[3]; link.textContent = t[4] + " ↗";
  }));
  const scene = document.querySelector(".universe-scene");
  if (scene && matchMedia("(hover:hover) and (pointer:fine)").matches) {
    scene.addEventListener("pointermove", e => { const r=scene.getBoundingClientRect(); scene.style.setProperty("--rx", `${((e.clientY-r.top)/r.height-.5)*-5}deg`); scene.style.setProperty("--ry", `${((e.clientX-r.left)/r.width-.5)*7}deg`); });
    scene.addEventListener("pointerleave", () => { scene.style.setProperty("--rx","0deg"); scene.style.setProperty("--ry","0deg"); });
  }
  if ("IntersectionObserver" in window) { const ob = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add("visible");ob.unobserve(e.target);} }),{threshold:.12}); document.querySelectorAll(".reveal").forEach(el=>ob.observe(el)); }
  else document.querySelectorAll(".reveal").forEach(el=>el.classList.add("visible"));
  const btn=document.getElementById("whatsappButton"), popup=document.getElementById("whatsappPopup"), close=document.getElementById("whatsappClose");
  const setOpen=open=>{if(!btn||!popup)return;popup.classList.toggle("open",open);popup.setAttribute("aria-hidden",String(!open));btn.setAttribute("aria-expanded",String(open));};
  btn?.addEventListener("click",()=>setOpen(!popup.classList.contains("open"))); close?.addEventListener("click",()=>setOpen(false));
  document.addEventListener("keydown",e=>{if(e.key==="Escape")setOpen(false);});
  document.querySelectorAll("[data-current-year]").forEach(el=>el.textContent=new Date().getFullYear());
});