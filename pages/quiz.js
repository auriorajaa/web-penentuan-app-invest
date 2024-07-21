document.addEventListener('DOMContentLoaded', () => {
   const quizContainer = document.getElementById('quiz-container');
   const nextBtn = document.getElementById('next-btn');
   const results = document.getElementById('results');

   const questions = [
      // Criterion 1: Ease of Use
      {
         question: 'How important is ease of use when choosing an investment platform for you?',
         options: [
            { text: 'Ease of use is very important because I want to choose a platform that is easy to understand and use.', weight: 1.0 },
            { text: 'Ease of use is quite important, but I also consider other features.', weight: 0.75 },
            { text: 'Ease of use is somewhat important, but I can adapt to a more complex interface.', weight: 0.5 },
            { text: 'Ease of use is less important to me, as long as the platform offers strong features.', weight: 0.25 },
            { text: 'Ease of use is not my primary concern when choosing an investment platform.', weight: 0 },
         ],
         maxWeight: 0.2,
         scores: {
            Stockbit: 9,
            Bibit: 8,
            Ajaib: 7,
            Bareksa: 6,
            IPOT: 5
         }
      },
      // Criterion 2: Educational Features
      {
         question: 'How important are educational features when choosing an investment platform for you?',
         options: [
            { text: 'Educational features are very important because I want to better understand investing before starting.', weight: 1.0 },
            { text: 'Educational features are quite important, but I focus more on transaction ease.', weight: 0.75 },
            { text: 'Educational features are somewhat important, but I prefer platforms with low fees.', weight: 0.5 },
            { text: 'Educational features are less important; I focus more on security aspects.', weight: 0.25 },
            { text: 'Educational features are not a priority for me when choosing an investment platform.', weight: 0 },
         ],
         maxWeight: 0.15,
         scores: {
            IPOT: 9,
            Ajaib: 8,
            Bareksa: 7,
            Stockbit: 6,
            Bibit: 5
         }
      },
      // Criterion 3: Transaction Costs
      {
         question: 'How important are transaction costs when choosing an investment platform for you?',
         options: [
            { text: 'Very low transaction costs are my top priority when choosing a platform.', weight: 1.0 },
            { text: 'I consider transaction costs, but I also take other features into account.', weight: 0.75 },
            { text: 'Transaction costs are a consideration, but high-quality customer support is more important to me.', weight: 0.5 },
            { text: 'Transaction costs are less important, especially if the platform provides a variety of investment instruments.', weight: 0.25 },
            { text: 'Transaction costs are not a major factor in my decision to choose an investment platform.', weight: 0 },
         ],
         maxWeight: 0.2,
         scores: {
            Bareksa: 9,
            Bibit: 8,
            Ajaib: 7,
            Stockbit: 6,
            IPOT: 5
         },
         isCost: true
      },
      // Criterion 4: Security
      {
         question: 'How important is security when choosing an investment platform for you?',
         options: [
            { text: 'Security is very important because I want to ensure my funds and personal data are safe.', weight: 1.0 },
            { text: 'Security is quite important, but I also consider ease of use.', weight: 0.75 },
            { text: 'Security is somewhat important, but I prefer platforms with low transaction costs.', weight: 0.5 },
            { text: 'Security is less important; I focus more on the educational features offered.', weight: 0.25 },
            { text: 'Security is not my primary concern when choosing an investment platform.', weight: 0 },
         ],
         maxWeight: 0.2,
         scores: {
            Bibit: 9,
            IPOT: 8,
            Stockbit: 7,
            Bareksa: 7,
            Ajaib: 5
         }
      },
      // Criterion 5: Customer Support
      {
         question: 'How important is customer support when choosing an investment platform for you?',
         options: [
            { text: 'Customer support is very important because I want quick assistance when I encounter issues.', weight: 1.0 },
            { text: 'Customer support is quite important, but I also consider transaction costs.', weight: 0.75 },
            { text: 'Customer support is somewhat important, but I prefer platforms with good educational features.', weight: 0.5 },
            { text: 'Customer support is less important; I focus more on the availability of investment instruments.', weight: 0.25 },
            { text: 'Customer support is not a major factor in my decision to choose an investment platform.', weight: 0 },
         ],
         maxWeight: 0.1,
         scores: {
            Bareksa: 9,
            Ajaib: 8,
            Bibit: 7,
            Stockbit: 6,
            IPOT: 5
         }
      },
      // Criterion 6: Availability of Investment Instruments
      {
         question: 'How important is the availability of various investment instruments when choosing a platform for you?',
         options: [
            { text: 'The availability of various investment instruments is very important because I want to have many investment options.', weight: 1.0 },
            { text: 'The availability of investment instruments is quite important, but I also consider security aspects.', weight: 0.75 },
            { text: 'The availability of investment instruments is somewhat important, but I prefer platforms with low transaction costs.', weight: 0.5 },
            { text: 'The availability of investment instruments is less important; I focus more on the ease of use of the platform.', weight: 0.25 },
            { text: 'The availability of investment instruments is not a primary concern when choosing an investment platform.', weight: 0 },
         ],
         maxWeight: 0.15,
         scores: {
            Ajaib: 9,
            Stockbit: 6,
            IPOT: 7,
            Bibit: 6,
            Bareksa: 9
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

   function calculateActualWeight(selectedWeight, maxWeight) {
      return selectedWeight * maxWeight;
   }

   function handleNext() {
      const selectedOption = document.querySelector('input[name="option"]:checked');
      if (selectedOption) {
         const selectedWeight = parseFloat(selectedOption.value);
         const maxWeight = questions[currentQuestionIndex].maxWeight;
         const actualWeight = calculateActualWeight(selectedWeight, maxWeight);
         userWeights.push(actualWeight);
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
         if (question.isCost) {
            const maxScore = Math.max(...Object.values(question.scores));
            Object.keys(question.scores).forEach(app => {
               totalScores[app] += ((maxScore - question.scores[app]) / maxScore) * weight;
            });
         } else {
            Object.keys(question.scores).forEach(app => {
               totalScores[app] += question.scores[app] * weight;
            });
         }
      });

      console.log("Total Scores Before Normalization:", totalScores);

      const maxScore = Math.max(...Object.values(totalScores));
      const normalizedScores = {};

      if (maxScore > 0) {
         Object.keys(totalScores).forEach(app => {
            normalizedScores[app] = (totalScores[app] / maxScore).toFixed(2);
         });

         console.log("Normalized Scores:", normalizedScores);

         const sortedResults = Object.entries(normalizedScores).sort((a, b) => b[1] - a[1]);
         const bestApp = sortedResults[0][0];
         const secondBestApp = sortedResults[1][0];

         // Output hasil terbaik
         console.log(`Aplikasi terbaik: ${bestApp}`);
         console.log(`Aplikasi kedua terbaik: ${secondBestApp}`);

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
                        <p class="mt-4 font-light text-gray-500">Your best application is <strong class="font-semibold text-black">${bestApp}</strong> based on the selected criteria.</p>
                        <p class="font-light text-gray-500">The second best option is <strong class="font-semibold text-black">${secondBestApp}</strong>.</p>
                        <p class="mt-4 font-normal italic">${reasons[bestApp]}</p>
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
                                 <tbody class="text-gray-500">
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
                            <tbody class="text-gray-500">
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

      } else {
         console.log("Tidak ada skor yang valid untuk normalisasi.");
      }

   }

   nextBtn.addEventListener('click', handleNext);

   loadQuestion();
});
