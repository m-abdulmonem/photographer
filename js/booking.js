document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const bookingCalendarEl = document.getElementById('bookingCalendar');
    const steps = document.querySelectorAll('.step');
    const bookingForm = document.getElementById('bookingForm');

    // Section elements
    const calendarSection = document.querySelector('.calendar-section');
    const packageSection = document.querySelector('.package-selection');
    const clientSection = document.querySelector('.client-details');
    const confirmationSection = document.querySelector('.confirmation-section');

    // Navigation buttons
    const nextFromCalendarBtn = document.getElementById('nextFromCalendar');
    const backToCalendarBtn = document.getElementById('backToCalendar');
    const proceedToDetailsBtn = document.getElementById('proceedToDetails');
    const backToPackagesBtn = document.getElementById('backToPackages');

    // Data elements
    const selectedDateEl = document.getElementById('selectedDate');
    const summaryDateEl = document.getElementById('summaryDate');
    const confirmationDateEl = document.getElementById('confirmationDate');
    const summaryPackageEl = document.getElementById('summaryPackage');
    const confirmationPackageEl = document.getElementById('confirmationPackage');
    const summaryTotalEl = document.getElementById('summaryTotal');
    const bookingRefEl = document.getElementById('bookingRef');

    // Booking Data
    let bookingData = {
        date: null,
        package: null,
        packagePrice: null,
        clientInfo: {}
    };

    // Initialize Calendar with error handling
    function initializeCalendar() {
        if (!bookingCalendarEl) {
            console.error('Calendar container not found');
            return null;
        }

        if (typeof FullCalendar === 'undefined') {
            console.error('FullCalendar not loaded');
            return null;
        }

        try {
            const calendar = new FullCalendar.Calendar(bookingCalendarEl, {
                initialView: 'dayGridMonth',
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek'
                },
                selectable: true,
                select: function (info) {
                    // Ensure we have the required date info
                    if (!info.start) {
                        console.error('Selection missing start date:', info);
                        return;
                    }

                    // Clone the info object and add dayEl if missing
                    const selectionInfo = { ...info };
                    if (!selectionInfo.dayEl) {
                        const dateStr = selectionInfo.startStr;
                        selectionInfo.dayEl = document.querySelector(`.fc-day[data-date="${dateStr}"]`);
                    }
                    handleDateSelection(info);
                },
                datesSet: function (info) {
                    markBookedDates();
                }
            });
            calendar.render();
            return calendar;
        } catch (error) {
            console.error('Calendar initialization failed:', error);
            return null;
        }
    }

    // Handle date selection with proper error checking
    // function handleDateSelection(info) {
    //     try {
    //         if (!info || !info.dayEl || !info.start) {
    //             console.error('Invalid selection info:', info);
    //             return;
    //         }

    //         // Check if weekend
    //         if (info.start.getDay() === 0 || info.start.getDay() === 6) {
    //             alert('Weekends are not available for booking. Please select a weekday.');
    //             return;
    //         }

    //         // Clear previous selections safely
    //         const prevSelected = document.querySelectorAll('.fc-day-selected');
    //         prevSelected.forEach(day => {
    //             try {
    //                 day.classList.remove('fc-day-selected');
    //             } catch (e) {
    //                 console.error('Error clearing selection:', e);
    //             }
    //         });

    //         // Mark new selection
    //         info.dayEl.classList.add('fc-day-selected');

    //         // Save selected date
    //         const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    //         bookingData.date = info.start.toLocaleDateString('en-US', options);
    //         selectedDateEl.textContent = bookingData.date;

    //         // Enable next button
    //         if (nextFromCalendarBtn) nextFromCalendarBtn.disabled = false;

    //     } catch (error) {
    //         console.error('Date selection error:', error);
    //     }
    // }

    function handleDateSelection(info) {
        try {
            console.log('Selection info:', info); // Debug log

            if (!info || !info.start) {
                console.error('Invalid selection info - missing start date:', info);
                return;
            }

            // Check if weekend
            if (info.start.getDay() === 0 || info.start.getDay() === 6) {
                alert('Weekends are not available for booking. Please select a weekday.');
                return;
            }

            // Find the day element if not provided
            let dayEl = info.dayEl;
            if (!dayEl) {
                const dateStr = info.startStr;
                dayEl = document.querySelector(`.fc-day[data-date="${dateStr}"]`);
                if (!dayEl) {
                    console.error('Could not find day element for date:', dateStr);
                    return;
                }
            }

            // Clear previous selections safely
            const prevSelected = document.querySelectorAll('.fc-day-selected');
            prevSelected.forEach(day => {
                try {
                    day.classList.remove('fc-day-selected');
                } catch (e) {
                    console.error('Error clearing selection:', e);
                }
            });

            // Mark new selection
            dayEl.classList.add('fc-day-selected');

            // Save selected date
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            bookingData.date = info.start.toLocaleDateString('en-US', options);
            selectedDateEl.textContent = bookingData.date;

            // Enable next button
            if (nextFromCalendarBtn) nextFromCalendarBtn.disabled = false;

        } catch (error) {
            console.error('Date selection error:', error);
        }
    }
    // Mark booked dates on calendar
    function markBookedDates() {
        try {
            const bookedDates = ['2025-06-10', '2025-06-15', '2025-06-20', '2025-06-25'];
            const days = document.querySelectorAll('.fc-day');

            days.forEach(day => {
                const dateStr = day.getAttribute('data-date');
                if (!dateStr) return;

                if (bookedDates.includes(dateStr)) {
                    day.classList.add('fc-day-booked');
                } else {
                    const date = new Date(dateStr);
                    if (date.getDay() !== 0 && date.getDay() !== 6) {
                        day.classList.add('fc-day-available');
                    }
                }
            });
        } catch (error) {
            console.error('Error marking booked dates:', error);
        }
    }

    // Initialize calendar
    const calendar = initializeCalendar();

    // Package Selection
    document.querySelectorAll('.select-package').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            // Update button states
            document.querySelectorAll('.select-package').forEach(b => {
                b.classList.remove('btn-primary');
                b.classList.add('btn-outline');
            });
            this.classList.remove('btn-outline');
            this.classList.add('btn-primary');

            // Save package
            const packageCard = this.closest('.package-card');
            bookingData.package = packageCard.querySelector('h3').textContent;
            bookingData.packagePrice = packageCard.querySelector('.price').textContent;

            // Enable proceed button
            proceedToDetailsBtn.disabled = false;
        });
    });

    // Navigation: Next from Calendar
    nextFromCalendarBtn.addEventListener('click', function () {
        calendarSection.classList.add('hidden');
        packageSection.classList.remove('hidden');
        updateSteps(2);
    });

    // Navigation: Back to Calendar
    backToCalendarBtn.addEventListener('click', function () {
        packageSection.classList.add('hidden');
        calendarSection.classList.remove('hidden');
        updateSteps(1);
    });

    // Navigation: Proceed to Details
    proceedToDetailsBtn.addEventListener('click', function () {
        if (!bookingData.package) {
            alert('Please select a package before proceeding');
            return;
        }

        // Update summary
        summaryDateEl.textContent = bookingData.date;
        summaryPackageEl.textContent = bookingData.package;
        summaryTotalEl.textContent = bookingData.packagePrice;

        // Show next section
        packageSection.classList.add('hidden');
        clientSection.classList.remove('hidden');
        updateSteps(3);
    });

    // Navigation: Back to Packages
    backToPackagesBtn.addEventListener('click', function () {
        clientSection.classList.add('hidden');
        packageSection.classList.remove('hidden');
        updateSteps(2);
    });

    // Form Submission
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Save form data
        bookingData.clientInfo = {
            name: this.elements['fullName'].value,
            email: this.elements['email'].value,
            phone: this.elements['phone'].value,
            eventType: this.elements['eventType'].value,
            location: this.elements['location'].value,
            specialRequests: this.elements['specialRequests'].value
        };

        // Generate reference
        bookingRefEl.textContent = 'ELESAWY-' + Math.floor(Math.random() * 1000000);
        confirmationDateEl.textContent = bookingData.date;
        confirmationPackageEl.textContent = bookingData.package;

        // Show confirmation
        clientSection.classList.add('hidden');
        confirmationSection.classList.remove('hidden');
        updateSteps(4);
    });

    // Update step indicators
    function updateSteps(activeStep) {
        steps.forEach(step => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            step.classList.remove('active', 'completed');

            if (stepNum < activeStep) {
                step.classList.add('completed');
            } else if (stepNum === activeStep) {
                step.classList.add('active');
            }
        });
    }

    // Initialize
    updateSteps(1);
    if (nextFromCalendarBtn) nextFromCalendarBtn.disabled = true;
    if (proceedToDetailsBtn) proceedToDetailsBtn.disabled = true;
    packageSection.classList.add('hidden');
    clientSection.classList.add('hidden');
    confirmationSection.classList.add('hidden');
});



// // ... [previous code remains the same until the form submission]

// // Form Submission
// bookingForm.addEventListener('submit', function (e) {
//     e.preventDefault();

//     // Save form data
//     bookingData.clientInfo = {
//         name: this.elements['fullName'].value,
//         email: this.elements['email'].value,
//         phone: this.elements['phone'].value,
//         eventType: this.elements['eventType'].value,
//         location: this.elements['location'].value,
//         specialRequests: this.elements['specialRequests'].value
//     };

//     // Generate reference
//     bookingRefEl.textContent = 'ELESAWY-' + Math.floor(Math.random() * 1000000);
//     confirmationDateEl.textContent = bookingData.date;
//     confirmationPackageEl.textContent = bookingData.package;

//     // Show confirmation
//     clientSection.classList.add('hidden');
//     confirmationSection.classList.remove('hidden');
//     updateSteps(4);

//     // Force dark mode styles if needed
//     updateDarkModeStyles();
// });

// // Update styles for dark mode
// function updateDarkModeStyles() {
//     const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

//     // Update booking summary in dark mode
//     const bookingSummary = document.querySelector('.booking-summary');
//     if (bookingSummary) {
//         if (isDarkMode) {
//             bookingSummary.style.backgroundColor = 'var(--card-bg)';
//             bookingSummary.style.border = '1px solid var(--border-color)';
//         } else {
//             bookingSummary.style.backgroundColor = '#f9f9f9';
//             bookingSummary.style.border = 'none';
//         }
//     }
// }

// // Initialize dark mode styles
// updateDarkModeStyles();

// // Watch for theme changes
// const observer = new MutationObserver(function (mutations) {
//     mutations.forEach(function (mutation) {
//         if (mutation.attributeName === 'data-theme') {
//             updateDarkModeStyles();
//         }
//     });
// });
// observer.observe(document.documentElement, { attributes: true });

// // ... [rest of the code remains the same]