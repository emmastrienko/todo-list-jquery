const classNames = {
  TODO_ITEM: "todo-container",
  TODO_CHECKBOX: "todo-checkbox",
  TODO_TEXT: "todo-text",
  TODO_DELETE: "todo-delete",
};

const $list = $("#todo-list");
const $itemCountSpan = $("#item-count");
const $uncheckedCountSpan = $("#unchecked-count");

let itemCount = 0;
let uncheckedCount = 0;

function newTodo() {
  const $todoItem = $("<li>").addClass(classNames.TODO_ITEM);

  const $checkbox = $("<input>")
    .attr("type", "checkbox")
    .addClass(classNames.TODO_CHECKBOX)
    .change(updateCounts);

  const $text = $("<span>")
    .addClass(classNames.TODO_TEXT)
    .attr("contenteditable", true)
    .text("New TODO");

  const $deleteButton = $("<button>")
    .addClass(classNames.TODO_DELETE)
    .text("Delete")
    .click(function () {
      $todoItem.remove();
      itemCount--;
      if (!$checkbox.is(":checked")) {
        uncheckedCount--;
      }
      updateCounts();
    });

  $todoItem.append($checkbox, $text, $deleteButton);
  $list.append($todoItem);

  itemCount++;
  uncheckedCount++;
  updateCounts();
}

function updateCounts() {
  $itemCountSpan.text(itemCount);
  $uncheckedCountSpan.text(uncheckedCount);

  const $checkboxes = $(`.${classNames.TODO_CHECKBOX}`);
  uncheckedCount = $checkboxes.filter(":not(:checked)").length;
  $uncheckedCountSpan.text(uncheckedCount);

  $(this).parent().toggleClass('checked', this.checked);
}

$(document).ready(function () {
  updateCounts();
});
