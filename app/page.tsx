import Filter from "@containers/filter";
import { AdjustmentsVerticalIcon } from '@heroicons/react/24/solid';

export default function Page() {
	return (
		<div className="layout">
			<div className="aside">
				<header>
				<h1>Yarn Directory</h1>
				<a className="hamburger">
					<AdjustmentsVerticalIcon />
				</a>
				</header>
        <Filter />
			</div>
			<div className="main">
			main area
			</div>
		</div>
	);
}
