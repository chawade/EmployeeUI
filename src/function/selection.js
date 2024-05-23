// selection.js

document.addEventListener('DOMContentLoaded', function () {
    var defaultselectbox = document.getElementById('cusSelectbox');
    var numOfOptions = defaultselectbox.children.length;
  
    // Hide select tag
    defaultselectbox.classList.add('s-hidden');
  
    // Wrapping default selectbox into custom select block
    var cusSelBlock = document.createElement('div');
    cusSelBlock.classList.add('cusSelBlock');
    defaultselectbox.parentNode.insertBefore(cusSelBlock, defaultselectbox);
    cusSelBlock.appendChild(defaultselectbox);
  
    // Creating custom select div
    var selectLabel = document.createElement('div');
    selectLabel.classList.add('selectLabel');
    selectLabel.innerText = defaultselectbox.children[0].innerText;
    cusSelBlock.appendChild(selectLabel);
  
    // Appending options to custom un-ordered list tag
    var cusList = document.createElement('ul');
    cusList.classList.add('options');
    selectLabel.parentNode.insertBefore(cusList, selectLabel.nextSibling);
  
    // Generating custom list items
    for (var i = 0; i < numOfOptions; i++) {
      var optionText = defaultselectbox.children[i].innerText;
      var optionValue = defaultselectbox.children[i].value;
      var listItem = document.createElement('li');
      listItem.innerText = optionText;
      listItem.setAttribute('data-value', optionValue);
      cusList.appendChild(listItem);
    }
  
    // Open list and close list functions
    function openList() {
      for (var i = 0; i < numOfOptions; i++) {
        cusList.children[i].style.transform = 'translateY(' + (i * 100 + 100) + '%)';
        cusList.children[i].style.transitionDelay = i * 30 + 'ms';
      }
    }
  
    function closeList() {
      for (var i = 0; i < numOfOptions; i++) {
        cusList.children[i].style.transform = 'translateY(0)';
        cusList.children[i].style.transitionDelay = '0';
      }
    }
    // Click event functions
    selectLabel.addEventListener('click', function () {
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
          openList();
        } else {
          closeList();
        }
      });
    
      cusList.addEventListener('click', function (e) {
        var selectedText = e.target.innerText;
        selectLabel.innerText = selectedText;
        defaultselectbox.value = selectedText;
        closeList();
        selectLabel.classList.remove('active');
      });
    });