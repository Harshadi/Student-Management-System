import $ from "jquery";
import React from "react";
import "./style.css";

export default function Demo2() {
	$("#typeOfGlass").on("change", function () {
		console.log($("#typeOfGlass").val());
		$("#glassWidth").html("");
		if ($("#typeOfGlass").val() == 15) {
			$("#glassWidth").append('<option value="19">19</option>');
			$("#glassWidth").append('<option value="20">20</option>');
			$("#glassWidth").append('<option value="21">21</option>');
		} else {
			$("#glassWidth").append('<option value="6">6</option>');
			$("#glassWidth").append('<option value="7">7</option>');
			$("#glassWidth").append('<option value="8">8</option>');
			$("#glassWidth").append('<option value="9">9</option>');
		}
	});

	return (
		<div>
			<select id="typeOfGlass">
				<option value="15">Standard/Annealed Glass Width</option>
				<option value="20">Tempered Glass Width</option>
			</select>
			<br></br>
			Glass Width
			<br />
			<select id="glassWidth">
				<option value="19">19</option>
				<option value="20">20</option>
				<option value="21">21</option>
			</select>
		</div>
	);
}
