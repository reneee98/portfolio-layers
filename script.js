// Handle expertise section accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const expertiseItems = document.querySelectorAll('.expertise-item');
    
    expertiseItems.forEach(item => {
        const headerRow = item.querySelector('.expertise-header-row');
        const content = item.querySelector('.expertise-content');
        
        // Set initial state
        content.style.height = '0px';
        content.style.transition = 'height 0.3s cubic-bezier(0.33, 1, 0.68, 1)';
        
        headerRow.addEventListener('click', () => {
            const isExpanded = item.classList.contains('expanded');
            
            // Close all other items
            expertiseItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('expanded')) {
                    otherItem.classList.remove('expanded');
                    const otherContent = otherItem.querySelector('.expertise-content');
                    otherContent.style.height = '0px';
                }
            });
            
            // Toggle current item
            if (!isExpanded) {
                item.classList.add('expanded');
                content.style.height = content.scrollHeight + 'px';
            } else {
                item.classList.remove('expanded');
                content.style.height = '0px';
            }
        });
    });
}); 