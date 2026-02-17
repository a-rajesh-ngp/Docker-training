
export const vUppercase = {
    mounted: (el) => {
        el.addEventListener('input', (e)=> {
            const value = e.target.value;
            if(!value) return;

            const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
            if(value!== capitalized) {
                e.target.value = capitalized;
                e.target.dispatchEvent(new Event('input'))
            }
        })
    }
}

