$(document).ready(function () {
    'use strict';

    window.writeTable = writeTable;
    window.writeRow = writeRow;
    window.bindButton = bindButton;

    setTimeout(bindButton, 2000);
});


function bindButton() {
    let button = '<div class="aui-item"><button id="copyToFormat" class="aui-button" aria-controls="board-tools-section-content" resolved="" aria-haspopup="true" aria-expanded="false">Copy to QFS Format</button></div>';
    $(".ghx-sprint-report > .aui-group > .aui-item:has(h3) ").append(button);
    $("#copyToFormat").click(writeTable);
}

async function writeTable() {
    let rowTexts = [];
    $("table.aui > tbody >tr:not(:has(th))").each((i,t) => rowTexts.push(writeRow(t)));

    let totalText = rowTexts.join("\r\n");

    await navigator.clipboard.writeText(totalText);
}

function writeRow(row) {
    let blobs = [];

    let unplanned = $(row).hasClass("ghx-added");
    let cells = $(row).children();

    blobs.push($(cells[0].children[0]).text());   // key
    blobs.push($(cells[1]).text());               // summary
    blobs.push($(cells[2]).text());               // issue type
    blobs.push($(cells[3]).text());               // priority
    blobs.push($(cells[4]).text());               // status
    blobs.push($(cells[5]).text());               // story points

    blobs.push(["DONE", "CLOSED-WILL NOT FIX"].includes($(cells[4]).text().toUpperCase()) ? "TRUE" : "FALSE"); // Completed
    blobs.push(unplanned ? "TRUE" : "FALSE");     // Unplanned

    blobs.push("Must Have");                      // MoSCoW

    let rowText = blobs.join("\t");
    return rowText;
}