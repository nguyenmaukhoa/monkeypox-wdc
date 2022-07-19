(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    const tableCols = [
      {
        id: "ID",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "Status",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "City",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "Country",
        dataType: tableau.dataTypeEnum.string,
      },
           {
        id: "Age",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "Gender",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "Date_confirmation",
        dataType: tableau.dataTypeEnum.date,
      },
      {
        id: "Symptoms",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "Hospitalised",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "Outcome",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "Travel_history",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "Travel_history_location",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "Travel_history_country",
        dataType: tableau.dataTypeEnum.string,
      },
    ];

    let monkeyPoxTableSchema = {
      id: "GlobalHealth",
      alias: "GlobalHealth Monkeypox Cases",
      columns: tableCols,
    };

    schemaCallback([monkeyPoxTableSchema]);
  };

  myConnector.getData = function (table, doneCallback) {
    let tableData = [];
    var i = 0;

    $.getJSON(
      "https://raw.githubusercontent.com/globaldothealth/monkeypox/main/latest.json",
      function (resp) {
        // Iterate over the JSON object
        for (i = 0, len = resp.length; i < len; i++) {
          tableData.push({
            ID: resp[i].ID,
            Status: resp[i].Status,
            City: resp[i].City,
            Country: resp[i].Country,
            Age: resp[i].Age,
            Gender: resp[i].Gender,
            Date_confirmation: resp[i].Date_confirmation,
            Symptoms: resp[i].Symptoms,
            Outcome: resp[i].Outcome,
            Travel_history_location: resp[i].Travel_history_location,
            Travel_history_country: resp[i].Travel_history_country,
          });
        }
        table.appendRows(tableData);
        doneCallback();
      }
    );
  };

  tableau.registerConnector(myConnector);
})();

document.querySelector("#getData").addEventListener("click", getData);

function getData() {
  tableau.connectionName = "Global Health MonkeyPox";
  tableau.submit();
}