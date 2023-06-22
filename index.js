$(document).ready(function() {
  // get diary entries
  $.ajax({
    url: 'http://localhost:3000/entries',
    method: 'GET',
    success: function(entries) {
      renderEntries(entries);
    }
  });

  // Add new entry
  $('#diaryForm').submit(function(e) {
    e.preventDefault();
    var entryText = $('#entryText').val();
    var entryDate = $('#entryDate').val();
    $.ajax({
      url: 'http://localhost:3000/entries',
      method: 'POST',
      data: {
        text: entryText,
        date: entryDate
      },
      success: function(entry) {
        $('#entryText').val('');
        $('#entryDate').val('');
        renderEntry(entry);
      }
    });
  });

  // Update entry
  $(document).on('click', '.edit-entry', function() {
    var entryId = $(this).data('id');
    var newText = prompt('Enter new entry text:');
    if (newText) {
      $.ajax({
        url: 'http://localhost:3000/entries/' + entryId,
        method: 'PUT',
        data: {
          text: newText
        },
        success: function(entry) {
          $('#entry-' + entryId).replaceWith(renderEntry(entry));
        }
      });
    }
  });

  // Delete entry
  $(document).on('click', '.delete-entry', function() {
    var entryId = $(this).data('id');
    if (confirm('Are you sure you want to delete this entry?')) {
      $.ajax({
        url: 'http://localhost:3000/entries/' + entryId,
        method: 'DELETE',
        success: function() {
          $('#entry-' + entryId).remove();
        }
      });
    }
  });

  // Render single entry
  function renderEntry(entry) {
    var html = '<div class="entry" id="entry-' + entry.id + '">' +
                 '<h4>' + entry.date + '</h4>' +
                 '<p>' + entry.text + '</p>' +
                 '<button class="btn btn-primary edit-entry" data-id="' + entry.id + '">Edit</button> ' +
                 '<button class="btn btn-danger delete-entry" data-id="' + entry.id + '">Delete</button>' +
               '</div>';
    $('#diaryEntries').append(html);
  }

  // Render all entries
  function renderEntries(entries) {
    entries.forEach(function(entry) {
      renderEntry(entry);
    });
  }
});
