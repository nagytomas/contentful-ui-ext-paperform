import "core-js/fn/array/find-index";
import "core-js/es6/promise";
import "whatwg-fetch";

document.addEventListener("DOMContentLoaded", function() {
  window.contentfulExtension.init(function(api) {
    api.window.startAutoResizer();

    var value = api.field.getValue();
    var accessToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY0M2MwMjliYzJkODY5ZmY2NmYxOGVmYjdjZTY3NjM1ZGFiNGUyYzE0MzIzODI5YzBjMjZkMjdjY2I2YTQ4ZTRjMDUyMjQxNmU3MDMwNTBkIn0.eyJhdWQiOiIzIiwianRpIjoiNjQzYzAyOWJjMmQ4NjlmZjY2ZjE4ZWZiN2NlNjc2MzVkYWI0ZTJjMTQzMjM4MjljMGMyNmQyN2NjYjZhNDhlNGMwNTIyNDE2ZTcwMzA1MGQiLCJpYXQiOjE1NjU2MTA2NzcsIm5iZiI6MTU2NTYxMDY3NywiZXhwIjoxODgxMjI5ODc3LCJzdWIiOiIzMDM3MyIsInNjb3BlcyI6W119.0X7MkltBGFmRZCiIGiQv-ZNhAD8T8slE2WknlWU337D-HNkDYwXYDcmQuw_7Fto_i_rGagrnYfYnsc3ExnJCe1NnuWwuDjT9KFLwkeYo7Q7W7buVv1yMVJ5CuCvQaBoRER1Z9rg8VcsQPVyUjrLcjhNI81sb70iNp8lq800aU2oU8F4yT1WiBjfpXu9o2jl-8ovwl8UBUu86ISaH93wlN4tZqyGyWf83MM63XNPDda8Odkg-55JOsM9329J1lAvbJuBzD_y1DUZtDHldyYZZnhrmy7bY3FeTQi8qGFOL0G0q9qtDV0ETTBiXSEkPvOIV89-ynDKmObrjsJRVCWmC1iS5VftcrH6r7p4e5Qn6pQFC0ER6LMQbyRf1YfDO1CJxgkkVHPFOk25trulha7S3ee5jzeIiDUHA-tHW41n1p4RFXKwQ0cuUZbknOHEOTLmmFCQgT2KDfPwnTucyscHxA9qD3WQgAtvhD9GbZYILtcbznBlnac-PDvpIzlfZe5rI5_CRlx5CCn7VP8hC6y37MEX4IwYJ6hYmcq6dxs93lBz3M61T9-0Y9EsM6m0O7_7dpvyWkqVo6leVNQG1_CVT1cTJXafX0Oy6uhVYZyLgUsbnjDRDH2iHaSUkvH9P3ouKpgdqMa13DUKsb8n01iAEFUn3UdnHWuNfWch55p3S7KQ";
    var selectField = document.getElementById("paperform-select");

    fetch("https://api.paperform.co/v1/forms?limit=100", {
      headers: {
        Authorization: "Bearer " + accessToken
      },
      mode: "no-cors"
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var forms = data.results.forms;

        forms.forEach(function(value, index) {
          var option = document.createElement("option");
          option.setAttribute("value", value.id);
          option.innerText = value.title;
          selectField.appendChild(option);
        });

        if (!value) {
          // The field is empty, no need to select anything
          return;
        }

        var prevValueIndex = forms.findIndex(function(form) {
          return form.id === value;
        });

        if (prevValueIndex > -1) {
          selectField.value = value;
        } else {
          var warningElem = document.getElementById("warning-missing-form");
          warningElem.className = warningElem.className + " shown";
        }
      })
      .catch(function() {
        var warningElem = document.getElementById("warning-data-error");
        warningElem.className = warningElem.className + " shown";
      });

    selectField.addEventListener("change", function(event) {
      var value = event.target.value;

      api.field.setValue(value === "-1" ? undefined : value);
    });
  });
});
