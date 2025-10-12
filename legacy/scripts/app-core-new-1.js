    container.innerHTML = '';
    if (heading) {
      var headingParagraph = document.createElement('p');
      headingParagraph.textContent = heading;
      container.appendChild(headingParagraph);
    }
    var table = document.createElement('table');
    var headerRow = document.createElement('tr');
    [temperatureHeader, runtimeHeader, batteryHeader].forEach(function (text) {
      var headerCell = document.createElement('th');
      headerCell.textContent = text;
      headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);
      var row = document.createElement('tr');
      var temperatureCell = document.createElement('td');
      temperatureCell.style.color = scenario.color;
      temperatureCell.textContent = formatTemperatureForDisplay(scenario.celsius);
      var runtimeCellElem = document.createElement('td');
      runtimeCellElem.textContent = runtimeCell;
      var batteriesCell = document.createElement('td');
      batteriesCell.textContent = batteries;
      row.appendChild(temperatureCell);
      row.appendChild(runtimeCellElem);
      row.appendChild(batteriesCell);
      table.appendChild(row);
    });
    container.appendChild(table);
