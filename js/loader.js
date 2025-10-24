const Loader = (function () {
	let loader = `<div data-loader-modal class="loader-modal">
    <div class="loader">Loading...</div></div>`
	
	function Constructor() {
		if (!document.querySelector("[data-loader-modal]")) {
			document.body.innerHTML += loader
		}
		this.selector = document.querySelector(".loader-modal")
		
		this.show=()=> {
			if (this.selector) {
				document.body.classList.add("loader-loading")
				this.selector.classList.remove("loader-modal-hide")
				this.selector.classList.add("loader-modal-show")
			} else {
				document.body.innerHTML += loader
				this.selector = document.querySelector(".loader-modal")
				this.show()
			}
		}
		
		this.hide=()=> {
			if (this.selector) {
				document.body.classList.remove("loader-loading")
				this.selector.classList.remove("loader-modal-show")
				this.selector.classList.add("loader-modal-hide")
			}
		}
		
		this.destroy=()=> {
			if (this.selector) {
				document.body.classList.remove("loader-loading")
				this.selector.remove()
				this.selector = undefined
			}
		}
	}
	
	
	
	return function instance() {
		return new Constructor()
	}
	
})()
