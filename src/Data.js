let status = "idle";
let defUrl = "./projects.json";
let items = {};

async function fetchData(url) {
	url = url || defUrl;
	status = "loading";

	try {
		const data = await fetch(url).then(e => {
			return e.json();
		});

		status = "loaded";
		items = data;
		return items;
	} catch (e) {
		status = "error";
		console.error(e);
		return [];
	}
}

async function getItem(id) {
	if (status == "idle") {
		await fetchData();
	}
	if (status == "loading") {
        
        await new Promise((res)=>{
            const id = setInterval(()=>{
                if(status !== "loading"){
                    clearInterval(id);
                    res();
                }
            }, 100);
        });
    }
    
    if(status == "error") {
        return undefined;
    }
    
    return items.filter(e => e.id == id)[0];
}

export default {
	status,
	items,
	defUrl,
	fetchData,
	getItem
};
