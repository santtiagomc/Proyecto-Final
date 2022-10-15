import React from "react";
import style from "../../styles/FiltersNav.module.css";

export default function FiltersNav() {
	return (
		<>
			<div>
				<nav>
					<p>Filters</p>
					<select defaultValue="default">
						<option value="default" disabled selected>
							-- Alphabetical order --
						</option>
						<option value="asc">A to Z</option>
						<option value="desc">Z to A</option>
					</select>
					<select defaultValue="default">
						<option value="default" disabled selected>
							-- Order by price --
						</option>
						<option value="max">Min. to Máx.</option>
						<option value="min">Máx. to Min.</option>
					</select>
					<select defaultValue="default">
						<option value="default" disabled selected>
							-- Filter by author --
						</option>
					</select>
					<select defaultValue="default">
						<option value="default" disabled selected>
							-- Filter by gender --
						</option>
					</select>
				</nav>
			</div>
		</>
	);
}
