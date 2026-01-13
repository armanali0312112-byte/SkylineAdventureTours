    let selectedVehicleName = "";
    let selectedPricePerDay = 0;

    function toggleServiceDetails() {
        const service = document.getElementById('mainService').value;
        const area = document.getElementById('serviceDetailsArea');
        const totalDisplay = document.getElementById('displayTotal');
        
        area.classList.remove('hidden');
        document.getElementById('carFleet').classList.add('hidden');
        document.getElementById('flightForm').classList.add('hidden');
        document.getElementById('hotelOptions').classList.add('hidden');
        document.getElementById('tourOptions').classList.add('hidden');

        if(service === 'car') {
            document.getElementById('carFleet').classList.remove('hidden');
            totalDisplay.innerText = "Please select a vehicle";
        } else if(service === 'flight') {
            document.getElementById('flightForm').classList.remove('hidden');
            totalDisplay.innerText = "Flight Reservation";
        } else if(service === 'hotel') {
            document.getElementById('hotelOptions').classList.remove('hidden');
            totalDisplay.innerText = "Hotel Accommodation";
        } else if(service === 'tours') {
            document.getElementById('tourOptions').classList.remove('hidden');
            totalDisplay.innerText = "Tour Package Selection";
        }
    }

    function selectVehicle(name, price) {
        selectedVehicleName = name;
        selectedPricePerDay = price;
        calculateTotal();
    }

    function calculateTotal() {
        const service = document.getElementById('mainService').value;
        if (service !== 'car') return;

        const start = new Date(document.getElementById('startDate').value);
        const end = new Date(document.getElementById('endDate').value);
        const display = document.getElementById('displayTotal');
        
        if (start && end && end >= start && selectedPricePerDay > 0) {
            const diffDays = Math.max(1, Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)));
            const total = diffDays * selectedPricePerDay;
            display.innerText = `Total: Rs. ${total.toLocaleString()} for ${diffDays} Day(s)`;
        } else if (selectedPricePerDay > 0) {
            display.innerText = `Rate: Rs. ${selectedPricePerDay.toLocaleString()} / Day`;
        }
    }

    function sendBookingToWhatsapp() {
        const service = document.getElementById('mainService').value;
        const start = document.getElementById('startDate').value;
        const end = document.getElementById('endDate').value;
        const persons = document.getElementById('personCount').value;
        
        let message = `Here are my booking details:`;
        message += `%0A*Service:* ${service.toUpperCase()}%0A*Persons:* ${persons || 'N/A'}%0A*Dates:* ${start || 'N/A'} to ${end || 'N/A'}%0A`;

        if (service === 'car') {
            message += `*Vehicle:* ${selectedVehicleName}%0A*Price:* ${document.getElementById('displayTotal').innerText}`;
        } else if (service === 'flight') {
            message += `*Name:* ${document.getElementById('flightName').value}%0A*CNIC:* ${document.getElementById('flightCNIC').value}%0A*Route:* ${document.getElementById('flightRoute').value}`;
        } else if (service === 'hotel') {
            const room = document.querySelector('input[name="roomType"]:checked')?.value || 'Not selected';
            const qty = document.getElementById('roomCount').value;
            message += `*Room Type:* ${room}%0A*No. of Rooms:* ${qty}`;
        } else if (service === 'tours') {
            const tour = document.getElementById('tourSelect').value;
            message += `*Package:* ${tour}`;
        }

        window.open(`https://wa.me/923554242143?text=${message}`, '_blank');
    }

    const itineraries = {
        'skardu-5': {
            title: 'Skardu Adventure (5 Days)',
            days: ['Flight/Road to Skardu & Upper Kachura Lake', 'Shigar Valley, Cold Desert & Amburiq Mosque', 'Khaplu Valley & Mantokha Waterfall', 'Sadpara Lake & Deosai Plains', 'Airport Drop-off / Return Road Trip']
        },
        'skardu-hunza-8': {
            title: 'Skardu + Hunza Combo (8 Days)',
            days: ['Arrival in Skardu', 'Skardu Sightseeing (Shangrila/Kachura)', 'Travel to Hunza via Gilgit', 'Karimabad, Baltit & Altit Forts', 'Attabad Lake & Passu Cones', 'Khunjerab Pass (China Border)', 'Travel back to Skardu/Gilgit', 'Departure']
        },
        'hunza-3': {
            title: 'Hunza & Khunjerab (3 Days)',
            days: ['Flight to Gilgit - Travel to Karimabad - Sunset at Duikar', 'Attabad Lake, Passu & Khunjerab Border', 'Altit Fort & Return Flight/Road']
        },
        'fairy-5': {
            title: 'Fairy Meadows & Nanga Parbat (5 Days)',
            days: ['Travel to Raikot Bridge - Jeep to Tato - Trek to Fairy Meadows', 'Explore Fairy Meadows & Reflection Lake', 'Day Trek to Nanga Parbat Base Camp', 'Relax & Morning Photography', 'Trek Down & Return Journey']
        },
        'deosai-3': {
            title: 'Deosai Plains Hiking (3 Days)',
            days: ['Travel to Deosai - Camping at Sheosar Lake', 'Hike to Bara Pani & Wildlife Spotting', 'Visit Sadpara Lake & Return to Skardu']
        },
        'north-14': {
            title: 'All North Grand Expedition (14 Days)',
            days: ['Islamabad to Chilas', 'Arrival in Skardu', 'Upper Kachura & Shangrila', 'Shigar Valley', 'Deosai Plains', 'Travel to Gilgit', 'Hunza Valley Exploration', 'Attabad Lake & Passu', 'Khunjerab Border', 'Travel to Raikot Bridge', 'Fairy Meadows Trek', 'Nanga Parbat Base Camp', 'Travel back to Besham', 'Return to Islamabad']
        }
    };

    function openItinerary(tourKey) {
        const data = itineraries[tourKey];
        let html = `
            <div class="mb-6">
                <h2 class="text-3xl font-extrabold text-blue-950 mb-2">${data.title}</h2>
                <div class="h-1 w-20 bg-orange-500 rounded-full"></div>
            </div>
            <div class="space-y-6">`;
        
        data.days.forEach((day, index) => {
            html += `
                <div class="flex gap-5 relative">
                    ${index !== data.days.length - 1 ? '<div class="absolute left-4 top-8 bottom-[-24px] w-0.5 bg-slate-100"></div>' : ''}
                    <div class="bg-blue-950 text-white w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center font-bold shadow-lg z-10">
                        ${index + 1}
                    </div>
                    <div class="pt-1.5">
                        <p class="text-slate-700 font-medium text-lg leading-snug">${day}</p>
                    </div>
                </div>`;
        });
        
        html += `</div>
            <div class="mt-10 flex gap-4">
                <a href="https://wa.me/923554242143?text=I want to book ${data.title}" class="flex-1 bg-blue-950 text-white text-center py-4 rounded-xl font-bold hover:bg-orange-500 transition shadow-lg">Confirm Booking</a>
            </div>`;
        
        document.getElementById('modalContent').innerHTML = html;
        document.getElementById('itineraryModal').classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    function closeItinerary() {
        document.getElementById('itineraryModal').classList.add('hidden');
        document.body.style.overflow = 'auto'; // Re-enable scroll
    }

    document.addEventListener('DOMContentLoaded', function() {
        new Swiper('.destSwiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 }
            }
        });
    });

    function showInfo(type) {
        // Hide all content
        document.querySelectorAll('.info-content').forEach(content => {
            content.classList.add('hidden');
        });
        
        // Remove active class from all buttons
        document.querySelectorAll('.info-btn').forEach(btn => {
            btn.classList.remove('active-info-btn');
        });

        // Show specific content
        document.getElementById('info-' + type).classList.remove('hidden');
        
        // Add active class to clicked button
        document.getElementById('btn-' + type).classList.add('active-info-btn');

        // Re-init icons for the new content
        lucide.createIcons();
    }

        lucide.createIcons();

        var swiperTestimonial = new Swiper(".testimonialSwiper", {
            pagination: { el: ".swiper-pagination", clickable: true },
            loop: true,
            autoplay: { delay: 4000 },
        });

        var swiperDest = new Swiper(".destSwiper", {
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: { el: ".swiper-pagination", clickable: true },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }
        });
    