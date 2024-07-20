document.addEventListener('DOMContentLoaded', () => {
   const quizContainer = document.getElementById('quiz-container');
   const nextBtn = document.getElementById('next-btn');
   const results = document.getElementById('results');

   const questions = [
      // Kriteria 1: Kemudahan Penggunaan (Ease of Use)
      {
         question: 'Seberapa penting kemudahan penggunaan dalam memilih platform investasi bagi Anda?',
         options: [
            { text: 'Kemudahan penggunaan sangat penting, karena saya ingin memilih platform yang mudah dipahami dan digunakan.', weight: 0.4 },
            { text: 'Kemudahan penggunaan cukup penting, tetapi saya juga memperhitungkan fitur lainnya.', weight: 0.3 },
            { text: 'Kemudahan penggunaan agak penting, tetapi saya dapat beradaptasi dengan antarmuka yang lebih kompleks.', weight: 0.2 },
            { text: 'Kemudahan penggunaan kurang penting bagi saya, asalkan platform menawarkan fitur yang kuat.', weight: 0.1 },
         ],
         scores: {
            Bibit: 9,
            Stockbit: 7,
            IPOT: 6,
            Ajaib: 5,
            Bareksa: 4
         }
      },
      // Kriteria 2: Fitur Edukasi (Educational Features)
      {
         question: 'Seberapa penting fitur edukasi dalam memilih platform investasi bagi Anda?',
         options: [
            { text: 'Fitur edukasi sangat penting karena saya ingin memahami investasi dengan lebih baik sebelum memulai.', weight: 0.4 },
            { text: 'Fitur edukasi cukup penting, namun saya lebih fokus pada kemudahan transaksi.', weight: 0.3 },
            { text: 'Fitur edukasi agak penting, tetapi saya lebih memilih platform dengan biaya rendah.', weight: 0.2 },
            { text: 'Fitur edukasi kurang penting, saya lebih memperhatikan aspek keamanan.', weight: 0.1 },
         ],
         scores: {
            Stockbit: 8,
            IPOT: 7,
            Ajaib: 6,
            Bareksa: 5,
            Bibit: 4
         }
      },
      // Kriteria 3: Biaya Transaksi (Transaction Costs)
      {
         question: 'Seberapa penting biaya transaksi dalam memilih platform investasi bagi Anda?',
         options: [
            { text: 'Biaya transaksi yang sangat rendah adalah prioritas utama saya dalam memilih platform.', weight: 0.4 },
            { text: 'Saya memperhatikan biaya transaksi, tetapi juga memperhitungkan fitur lain yang ditawarkan.', weight: 0.3 },
            { text: 'Biaya transaksi menjadi pertimbangan, namun dukungan pelanggan yang berkualitas lebih penting bagi saya.', weight: 0.2 },
            { text: 'Biaya transaksi kurang penting, terutama jika platform menyediakan berbagai instrumen investasi.', weight: 0.1 },
         ],
         scores: {
            Ajaib: 9,
            Bareksa: 7,
            Stockbit: 6,
            Bibit: 5,
            IPOT: 4
         }
      },
      // Kriteria 4: Keamanan (Security)
      {
         question: 'Seberapa penting aspek keamanan dalam memilih platform investasi bagi Anda?',
         options: [
            { text: 'Keamanan sangat penting, karena saya ingin memastikan dana dan data pribadi saya aman.', weight: 0.4 },
            { text: 'Keamanan cukup penting, namun saya juga memperhitungkan aspek kemudahan penggunaan.', weight: 0.3 },
            { text: 'Keamanan agak penting, tetapi saya lebih memilih platform dengan biaya transaksi yang rendah.', weight: 0.2 },
            { text: 'Keamanan kurang penting, saya lebih memperhatikan fitur edukasi yang ditawarkan.', weight: 0.1 },
         ],
         scores: {
            Bibit: 9,
            IPOT: 8,
            Ajaib: 7,
            Stockbit: 6,
            Bareksa: 5
         }
      },
      // Kriteria 5: Dukungan Pelanggan (Customer Support)
      {
         question: 'Seberapa penting dukungan pelanggan dalam memilih platform investasi bagi Anda?',
         options: [
            { text: 'Dukungan pelanggan sangat penting, karena saya ingin mendapatkan bantuan cepat saat mengalami masalah.', weight: 0.4 },
            { text: 'Dukungan pelanggan cukup penting, namun saya juga mempertimbangkan biaya transaksi.', weight: 0.3 },
            { text: 'Dukungan pelanggan agak penting, tetapi saya lebih memilih platform dengan fitur edukasi yang baik.', weight: 0.2 },
            { text: 'Dukungan pelanggan kurang penting, saya lebih memperhatikan ketersediaan instrumen investasi.', weight: 0.1 },
         ],
         scores: {
            Stockbit: 9,
            Bibit: 8,
            Ajaib: 7,
            IPOT: 6,
            Bareksa: 5
         }
      },
      // Kriteria 6: Ketersediaan Instrumen Investasi (Availability of Investment Instruments)
      {
         question: 'Seberapa penting ketersediaan berbagai instrumen investasi dalam memilih platform bagi Anda?',
         options: [
            { text: 'Ketersediaan berbagai instrumen investasi sangat penting, karena saya ingin memiliki banyak pilihan investasi.', weight: 0.4 },
            { text: 'Ketersediaan instrumen investasi cukup penting, namun saya juga memperhatikan aspek keamanan.', weight: 0.3 },
            { text: 'Ketersediaan instrumen investasi agak penting, tetapi saya lebih memilih platform dengan biaya transaksi yang rendah.', weight: 0.2 },
            { text: 'Ketersediaan instrumen investasi kurang penting, saya lebih memperhatikan kemudahan penggunaan platform.', weight: 0.1 },
         ],
         scores: {
            IPOT: 9,
            Bareksa: 8,
            Stockbit: 7,
            Ajaib: 6,
            Bibit: 5
         }
      }
   ];

   let currentQuestionIndex = 0;
   let userWeights = [];

   function loadQuestion() {
      const question = questions[currentQuestionIndex];
      quizContainer.innerHTML = `
                <h2 class="text-2xl sm:text-2xl md:text-5xl capitalize font-bold mb-4">${question.question}</h2>
                ${question.options.map((option, index) => `
                    <div class="card mb-2" data-weight="${option.weight}">
                        <input type="radio" id="option${index}" name="option" value="${option.weight}" class="mr-2" />
                        <label for="option${index}" class="cursor-pointer">${option.text}</label>
                    </div>
                `).join('')}
            `;
      nextBtn.classList.remove('hidden');

      document.querySelectorAll('.card').forEach(card => {
         card.addEventListener('click', function () {
            document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            this.querySelector('input').checked = true;
         });
      });

      quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
   }

   function handleNext() {
      const selectedOption = document.querySelector('input[name="option"]:checked');
      if (selectedOption) {
         const weight = parseFloat(selectedOption.value);
         userWeights.push(weight);
         currentQuestionIndex++;
         if (currentQuestionIndex < questions.length) {
            loadQuestion();
         } else {
            showResults();
         }
      } else {
         alert('Please select an option.');
      }
   }

   function showResults() {
      const totalScores = {
         Bibit: 0,
         Stockbit: 0,
         IPOT: 0,
         Ajaib: 0,
         Bareksa: 0
      };

      questions.forEach((question, index) => {
         const weight = userWeights[index];
         Object.keys(question.scores).forEach(app => {
            totalScores[app] += question.scores[app] * weight;
         });
      });

      console.log("Total Scores Before Normalization:", totalScores);

      const maxScore = Math.max(...Object.values(totalScores));
      const normalizedScores = { ...totalScores };
      Object.keys(normalizedScores).forEach(app => {
         normalizedScores[app] = (normalizedScores[app] / maxScore).toFixed(2);
      });

      console.log("Normalized Scores:", normalizedScores);

      const sortedResults = Object.entries(normalizedScores).sort((a, b) => b[1] - a[1]);
      const bestApp = sortedResults[0][0];
      const secondBestApp = sortedResults[1][0];

      const reasons = {
         Bibit: 'Bibit is chosen for its excellent ease of use and educational features.',
         Stockbit: 'Stockbit stands out due to its competitive transaction costs and good customer support.',
         IPOT: 'IPOT excels in the availability of investment instruments and high data security.',
         Ajaib: 'Ajaib offers low transaction costs and responsive customer support.',
         Bareksa: 'Bareksa has solid educational features and reasonable transaction costs.'
      };

      const newWindow = window.open('', '_blank');
      newWindow.document.write(`
                <html>
                <head>
                    <link rel="icon" href="/assets/SPK_LOGO.jpg" type="image/x-icon">
                    <meta name="description" content="BlackMarket - Your go-to platform for making informed investment decisions. Explore comprehensive guides, tools, and resources to navigate financial markets with ease.">
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="/dist/output.css">
                    <link rel="stylesheet" href="/dist/input.css">
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.css">
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
                    <title>Start investing and find the best application for you on this website. My best application is ${bestApp}. Check it out and find the app that suits your needs!</title>
                    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                    <script type="text/javascript" src="https://platform-api.sharethis.com/js/sharethis.js#property=669a9699cc04fc0019b7640e&product=inline-share-buttons&source=platform" async="async"></script>
                    <style>
                        body {
                            opacity: 0;
                            animation: fadeIn 2s forwards;
                        }
                        @keyframes fadeIn {
                            to {
                                opacity: 1;
                            }
                        }
                    </style>
                </head>
                <body class="bg-[#f7f7f7] max-w-screen-lg mx-auto px-4 py-4 sm:px-6 md:px-8 lg:px-10" style="font-family: 'Poppins', sans-serif;">
                    <nav class="max-w-screen-lg mx-auto bg-pink-500 rounded-lg m-4">
                        <div class="flex flex-wrap items-center justify-between mx-auto p-4">
                            <a href="#" class="flex items-center space-x-2">
                                <img src="/assets/SPK_LOGO.jpg" class="h-8" alt="Logo">
                                <span class="text-md lg:text-xl font-bold text-white"><span class="text-black">Black</span>Market</span>
                            </a>
                            <div class="flex space-x-1 rtl:space-x-reverse">
                                <a href="/index.html">
                                    <button type="button" class="shadow-button hover:text-pink-500 rounded-lg text-black bg-white transition-transform duration-200 ease-in-out transform hover:translate-y-1 focus:ring-white focus:outline-none focus:border-transparent font-medium text-sm px-4 py-2 text-center">Go to Home</button>
                                </a>
                            </div>
                        </div>
                    </nav>
                    <div class="mb-8 text-center">
                        <h2 class="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black capitalize">Start Your <span class="text-pink-500">Investment</span> Journey with <span class="text-pink-500">${bestApp}</span></h2>
                        <p class="mt-4 font-light">Your best application is <strong class="font-semibold">${bestApp}</strong> based on the selected criteria.</p>
                        <p class="font-light">The second best option is <strong class="font-semibold">${secondBestApp}</strong>.</p>
                        <p class="mt-4">${reasons[bestApp]}</p>
                    </div>
                    <img src="/assets/${bestApp}.png" alt="${bestApp}" class="rounded-lg shadow-button mb-4 w-full mx-auto">
                    <div class="mt-8 overflow-x-auto">
    <h3 class="text-2xl font-bold mb-4">SAW Table</h3>
    <div class="inline-block min-w-full rounded-lg overflow-hidden">
        <table class="min-w-full bg-white">
            <thead class="bg-gray-100">
                <tr>
                    <th class="sticky left-0 bg-gray-100 py-2 px-4 border-b">Criteria</th>
                    ${Object.keys(totalScores).map(app => `<th class="py-2 px-4 border-b">${app}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${questions.map((question, index) => `
                    <tr>
                        <td class="sticky left-0 bg-white py-2 px-4 border-b">${question.question}</td>
                        ${Object.keys(totalScores).map(app => `<td class="py-2 px-4 border-b">${(question.scores[app] * userWeights[index]).toFixed(2)}</td>`).join('')}
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>
</div>
                    <div class="mt-8">
                        <h3 class="text-2xl font-bold mb-4">Normalized Scores</h3>
                        <table class="min-w-full bg-white rounded-lg overflow-hidden">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th class="py-2 px-4 border-b">Application</th>
                                    <th class="py-2 px-4 border-b">Normalized Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${sortedResults.map(([app, score]) => `
                                    <tr>
                                        <td class="py-2 px-4 border-b">${app}</td>
                                        <td class="py-2 px-4 border-b">${score}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-8 sharethis-inline-share-buttons"></div>
                    <script src="/node_modules/flowbite/dist/flowbite.min.js"></script>
                    <script src="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.js"></script>
                </body>
                </html>
            `);
      newWindow.document.close();
   }

   nextBtn.addEventListener('click', handleNext);

   loadQuestion();
});
