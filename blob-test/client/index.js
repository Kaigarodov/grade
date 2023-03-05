const pdfBtn = document.getElementById('pdfBtn')
const docBtn = document.getElementById('docBtn')

pdfBtn && pdfBtn.addEventListener('click', async ()=>{
    await getBlobFromServer('pdf')
 })

 docBtn && docBtn.addEventListener('click', async ()=>{
    await getBlobFromServer('doc')
 })

async function getBlobFromServer(type) {
    let blob = await (await fetch('/document?type='+type)).blob()

    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    link.innerText =  type+' link'
    link.target = '_blank'
    link.onclick = (e)=>{
        console.log(e.target.remove())
    }
    document.body.appendChild(link)
}