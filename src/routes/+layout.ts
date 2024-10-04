import type { LayoutLoad } from './$types';
export const ssr = false;
export const csr = true;
export const load: LayoutLoad = async (event) => {
	const co = document.cookie;
	console.log('cookie', co);
	//const layoutCookie = event.cookies.get("PaneForge:layout");
	//const collapsedCookie = event.cookies.get("PaneForge:collapsed");
	//
	//let layout: number[] | undefined;
	//let collapsed: boolean | undefined;
	//
	//if (layoutCookie) layout = JSON.parse(layoutCookie);
	//if (collapsedCookie) collapsed = JSON.parse(collapsedCookie);
	//

	//return { layout, collapsed };
	return {
		title: 'title'
	};
};
