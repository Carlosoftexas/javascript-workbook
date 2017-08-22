'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // valid brick selected
  let active = false;
  // Your code here
  let moved = false;

  let blocks = [

  ];
  assignEvents();

  function assignEvents() {
  let stackArray = document.querySelectorAll('[data-stack]') // array -> 3 elements
    .forEach((div, index) => { // div -> one of the data-block elem
       let id = div.id;

        div.addEventListener('click', (e) => {
          e.stopPropagation();
          if (active && false!==moved) {
              let childrenLength = div.children.length;
              if (childrenLength>0) {
                let topVal = parseInt(div.children[childrenLength-1].attributes[0].value);
                console.log(topVal, topVal);
                if (moved.size<=topVal) {
                  div.appendChild(moved.target);
                  assignEvents();
                  return
                } else {
                  moved = false;
                  active = false;
                  alert('Move is invalid');
                }
              } else {
                div.appendChild(moved.target);
                moved = false;
                active = false;
                assignEvents();
              }
          }
        });

          div.querySelectorAll('[data-block]').forEach((div, index) => { // div -> one of the data-block elem
    // e -> event object on 'click'
    // -> hold reference(target) to the actual div-element
    div.addEventListener('click', (e) => {
      e.stopPropagation();
      // e.target = div
      console.log(e.target.attributes[0].value); // first element -> 25

      moved = {
        target: e.target,  // reference to data-block div-element
        size: parseInt(e.target.attributes[0].value), // size attribute of div element
        index: index, // green -> 2  // index in parent container -> data-stack
        currentTowerId: e.target.parentNode.id
//        target: e.target
      };
      // parentNode.children.length -> 4
      if (e.target.parentNode.children.length==index+1) {
        active = true;
        // parentNode data-stack
        // e.target.parentNode.removeChild(e.target);
      } else {
        active = false;
        moved = false;
      }
    });
  }); 

    });
  }

    /*
  document.querySelectorAll('[data-block]').forEach((div, index) => { // div -> one of the data-block elem
    // e -> event object on 'click'
    // -> hold reference(target) to the actual div-element
    div.addEventListener('click', (e) => {
      e.stopPropagation();
      // e.target = div
      console.log(e.target.attributes[0].value); // first element -> 25

      moved = {
        target: e.target,  // reference to data-block div-element
        size: parseInt(e.target.attributes[0].value), // size attribute of div element
        index: index, // green -> 2  // index in parent container -> data-stack
        currentTowerId: e.target.parentNode.id
//        target: e.target
      };
      // parentNode.children.length -> 4
      if (e.target.parentNode.children.length==index+1) {
        active = true;
        // parentNode data-stack
        // e.target.parentNode.removeChild(e.target);
      } else {
        active = false;
        moved = false;
      }
    });
  });
  */
});
