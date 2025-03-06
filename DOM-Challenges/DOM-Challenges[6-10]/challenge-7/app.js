/**
 * Write your challenge solution here
 */

function displayAccordionContent(e) {
  const accordianItem = e.target.classList.contains('accordion-button')
    ? e.target.parentElement
    : e.target.parentElement.parentElement;

  const accordions = document.querySelector('.accordion');

  accordions.querySelectorAll('.active').forEach((accordion) => {
    accordion.classList.remove('active');
  });

  accordianItem.classList.toggle('active');
}

document.querySelector('.accordion').addEventListener('click', function (e) {
  if (
    e.target.classList.contains('accordion-button') ||
    e.target.classList.contains('arrow')
  ) {
    displayAccordionContent(e);
  }
});

// Better
// function displayAccordionContent(e) {
//   const accordionItem = e.target.closest('.accordion-item');
//   if (accordionItem) {
//     accordionItem.classList.toggle('active');
//   }
// }

// document.querySelector('.accordion').addEventListener('click', function (e) {
//   if (e.target.matches('.accordion-button') || e.target.matches('.arrow')) {
//     displayAccordionContent(e);
//   }
// });
