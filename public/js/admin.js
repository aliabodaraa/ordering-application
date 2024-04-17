const deleteProduct = (btnEle)=>{
    console.log("Clicked")
    const productId = btnEle.parentNode.querySelector('[name=productId]').value
    const csrf = btnEle.parentNode.querySelector('[name=_csrf]').value
    
    const productElement = btnEle.closest('article');

    fetch('/admin/product/'+productId,{
        method:'DELETE',
        headers:{'csrf-token':csrf}
    }).then((res)=>{
        return res.json();
    }).then((res)=>{
        console.log(res);
        productElement.remove();
    }).catch((err)=>{
        console.log(err);
    });
}