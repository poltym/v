document.addEventListener('DOMContentLoaded', function() {
    // Download Data from API
    fetch('load_data.php')
        .then(response => response.json())
        .then(data => {
            const taskTable = document.getElementById('taskTable');
            data.forEach(task => {
                const row = taskTable.insertRow();
                row.innerHTML = `
                    <td>${task.task}</td>
                    <td>${task.title}</td>
                    <td>${task.description}</td>
                    <td style="background-color: ${task.colorCode};">${task.colorCode}</td>
                `;
            });
        });

    // Search
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        const filter = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('#taskTable tr');
        rows.forEach(row => {
            const taskName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            row.style.display = taskName.includes(filter) ? '' : 'none';
        });
    });

    // Autoreload
    setInterval(function() {
       
        fetch('load_data.php')
            .then(response => response.json())
            .then(data => {
                // Clean
                const taskTable = document.getElementById('taskTable');
                taskTable.innerHTML = `
                    
                    <tbody id="taskTable">
                    </tbody>
                `;
                data.forEach(task => {
                    const row = taskTable.insertRow();
                    row.innerHTML = `
                        <td>${task.task}</td>
                        <td>${task.title}</td>
                        <td>${task.description}</td>
                        <td style="background-color: ${task.colorCode};">${task.colorCode}</td>
                    `;
                });
            });
    }, 3600000); // 60 min

    // Modal window
    var modal = document.getElementById('modal');
    var openModalButton = document.getElementById('openModalButton');
    var fileInput = document.getElementById('fileInput');
    var uploadedImage = document.getElementById('uploadedImage');
    var closeModal = document.getElementById("closeModal");
    
    openModalButton.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    fileInput.addEventListener('change', function() {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block';
            
            
        };
        reader.readAsDataURL(file);
    });
    
    closeModal.onclick = function() {
    modal.style.display = "none";
	}
});
