document.addEventListener('DOMContentLoaded', function() {
    function checkQueryParamAndToggleDiv() {
        // Get the current URL's query parameters
        let params = new URLSearchParams(window.location.search);
        
        // Check if the "0a0a5105_page" parameter exists and its value
        let pageValue = params.get('0a0a5105_page');
        
        // Get the div element
        let divElem = document.querySelector('#feature-blog-component');
        
        // Based on the value of the "0a0a5105_page" parameter, either hide or display the div
        if (pageValue && parseInt(pageValue) > 1) {
            divElem.style.display = 'none';
        } else {
            divElem.style.display = 'block';
        }
    }

    window.fsAttributes = window.fsAttributes || [];
    window.fsAttributes.push([
        'cmsload',
        (listInstances) => {

          // The callback passes a `listInstances` array with all the `CMSList` instances on the page.
          const [listInstance] = listInstances;

          // The `renderitems` event runs whenever the list renders items after switching pages.
          listInstance.on('renderitems', (renderedItems) => {
            
            // Check the URL and show/hide the div whenever the list is updated
            checkQueryParamAndToggleDiv();
          });
        },
    ]);

    // Also run the check on initial page load
    checkQueryParamAndToggleDiv();

    // Attach an event listener to check every time the URL changes
    window.addEventListener('popstate', checkQueryParamAndToggleDiv);
});
