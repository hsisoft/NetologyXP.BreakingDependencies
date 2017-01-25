"use strict";

// Этот код можно менять как угодно

var items_old = {
	"milk": {price: 5.5, type: "Groceries"},
	"eggs": {price: 3.0, type: "Groceries"},
	"coca-cola": {price: 0.4, type: "Groceries"},
	"amoxicillin": {price: 6.7, type: "Groceries"},
	"aspirin": {price: 0.2, type: "PrescriptionDrug"},
	"marijuana": {price: 1.4, type: "PrescriptionDrug"},
	"hamburger": {price: 2, type: "PreparedFood"},
	"ceasar salad": {price: 4.2, type: "PreparedFood"},
};

var itemTypes_old =
	{
		"Groceries": {
			"Alabama": 0,
			"Alaska": 0,
			"Arizona": "",
			"Arkansas": 0.015,
			"California": "",
			"Colorado": "",
			"Connecticut": ""
		},
		"PrescriptionDrug": {
			"Alabama": "",
			"Alaska": 0,
			"Arizona": "",
			"Arkansas": "",
			"California": "",
			"Colorado": "",
			"Connecticut": ""
		}
	};

function getBaseTax(state) {
	var taxes = {
		"Alabama": 0.04,
		"Alaska": 0,
		"Arizona": 0.056,
		"Arkansas": 0.065,
		"California": 0.075,
		"Colorado": 0.029,
		"Connecticut": 0.0635
	};
	return taxes[state];
}

function calc(state, itemType) {
	return (itemTypes_old[itemType][state] === "") ? 0 : getBaseTax(state) + itemTypes_old[itemType][state];
}

class TaxCalculator {
	// У этой функции нелья менять интерфейс
	// Но можно менять содержимое
	calculateTax() {
		// prod
		var ordersCount = getOrdersCount();
		var state = getSelectedState();
		textOut(`----------${state}-----------`);
		for (var i = 0; i < ordersCount; i++) {
			var item = getSelectedItem();
			var result = calculatePriceFor(state, item);
			textOut(`${item}: $${result.toFixed(2)}`);
		}
		textOut(`----Have a nice day!-----`);
	}
}

function calculatePriceFor(state, item) {
	var result = null;
	result = (items_old[item].type === "PreparedFood") ? ( 1 + getBaseTax(state) ) * items_old[item].price : calc(state, items_old[item].type) * items_old[item].price + items_old[item].price;
	return result;
}

function textOut(text) {
	console.log(text);
}

//############################
//Production - код:
calculateTaxes();

//############################
//Тесты:
var tests = [
	() => assertEquals(3.0 * (1 + 0.04), calculatePriceFor("Alabama", "eggs")),
	() => assertEquals(0.4 * (1 + 0.015 + 0.065), calculatePriceFor("Arkansas", "coca-cola")),
	() => assertEquals(6.7 * (1 + 0.0), calculatePriceFor("Alaska", "amoxicillin")),
	() => assertEquals(6.7 * (1 + 0.0), calculatePriceFor("California", "amoxicillin")),
	() => assertEquals(2 * (1 + 0.0635), calculatePriceFor("Connecticut", "hamburger")),
];

//Раскомментируйте следующую строчку для запуска тестов:
runAllTests(tests);

//############################
//Код ниже этой строчки не надо менять для выполнения домашней работы

function calculateTaxes() {
	var calculator = new TaxCalculator();
	calculator.calculateTax();
}

function getSelectedItem() {
	var items = ["milk", "eggs", "coca-cola", "amoxicillin", "aspirin", "marijuana", "hamburger", "ceasar salad"];
	return items[Math.floor(Math.random() * items.length)];
}

function getSelectedState() {
	var state = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut"];
	return state[Math.floor(Math.random() * state.length)];
}

function getOrdersCount() {
	return Math.floor(Math.random() * 3) + 1;
}

//############################
// Кустарный способ писать тесты

function assertEquals(expected, actual) {
	var epsilon = 0.000001;
	var difference = Math.abs(expected - actual);
	if (difference > epsilon || difference === undefined || isNaN(difference)) {
		console.error(`Fail! Expected: ${expected}, Actual: ${actual}`);
		return -1;
	}
	return 0;
}

function runAllTests(tests) {
	var failedTests = tests
		.map((f) => f())
		.map((code) => {
			if (code === -1) {
				return 1
			} else {
				return 0
			}
		})
		.reduce((a, b) => a + b, 0);

	if (failedTests === 0) {
		console.log(`Success: ${tests.length} tests passed.`);
	}
	else {
		console.error(`Fail: ${failedTests} tests failed.`);
	}
}