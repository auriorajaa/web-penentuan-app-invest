// quiz.js

document.addEventListener('DOMContentLoaded', () => {
   const quizContainer = document.getElementById('quiz-container');
   const nextBtn = document.getElementById('next-btn');
   const results = document.getElementById('results');

   const questions = [
      // Kriteria 1: Kemudahan Penggunaan (Ease of Use)
      {
         question: 'Seberapa penting kemudahan penggunaan dalam memilih platform investasi bagi Anda?',
         options: [
            { text: 'Kemudahan penggunaan sangat penting, karena saya ingin memilih platform yang mudah dipahami dan digunakan.', weight: 0.05, app: 'Bibit' },
            { text: 'Kemudahan penggunaan cukup penting, tetapi saya juga memperhitungkan fitur lainnya.', weight: 0.03, app: 'Stockbit' },
            { text: 'Kemudahan penggunaan agak penting, tetapi saya dapat beradaptasi dengan antarmuka yang lebih kompleks.', weight: 0.01, app: 'IPOT' },
            { text: 'Kemudahan penggunaan kurang penting bagi saya, asalkan platform menawarkan fitur yang kuat.', weight: 0.005, app: 'Ajaib' },
            { text: 'Kemudahan penggunaan hampir tidak penting, karena saya lebih fokus pada biaya transaksi dan fitur edukasi.', weight: 0.005, app: 'Bareksa' }
         ]
      },
      {
         question: 'Bagaimana menurut Anda mengenai kemudahan penggunaan platform investasi yang tersedia di pasar?',
         options: [
            { text: 'Sebuah platform harus memiliki antarmuka yang sangat user-friendly dan mudah dinavigasi.', weight: 0.06, app: 'Bibit' },
            { text: 'Setidaknya cukup mudah digunakan, saya baik-baik saja jika memerlukan sedikit waktu untuk beradaptasi.', weight: 0.04, app: 'Stockbit' },
            { text: 'Tidak apa-apa jika agak kompleks yang penting menyediakan berbagai macam instrumen investasi untuk dipilih.', weight: 0.04, app: 'IPOT' },
            { text: 'Beberapa aplikasi menawarkan fitur yang rumit, namun tidak apa-apa jika tetap memberikan alat yang berguna bagi pengguna yang siap beradaptasi dengan antarmuka yang lebih kompleks.', weight: 0.03, app: 'Ajaib' },
            { text: 'Beberapa aplikasi mungkin memerlukan waktu untuk dipahami, tetapi dapat dipertimbangkan jika menyediakan fitur mendalam yang bisa sangat bermanfaat bagi pengguna yang ingin mengeksplorasi berbagai aspek investasi.', weight: 0.03, app: 'Bareksa' }
         ]
      },
      // Kriteria 2: Fitur Edukasi (Educational Features)
      {
         question: 'Seberapa penting fitur edukasi dalam memilih platform investasi bagi Anda?',
         options: [
            { text: 'Fitur edukasi sangat penting karena saya ingin memahami investasi dengan lebih baik sebelum memulai.', weight: 0.03, app: 'Stockbit' },
            { text: 'Fitur edukasi cukup penting, namun saya lebih fokus pada kemudahan transaksi.', weight: 0.02, app: 'IPOT' },
            { text: 'Fitur edukasi agak penting, tetapi saya lebih memilih platform dengan biaya rendah.', weight: 0.015, app: 'Ajaib' },
            { text: 'Fitur edukasi kurang penting, saya lebih memperhatikan aspek keamanan.', weight: 0.005, app: 'Bareksa' },
            { text: 'Fitur edukasi hampir tidak penting, karena saya lebih fokus pada biaya transaksi dan kemudahan penggunaan.', weight: 0.005, app: 'Bibit' }
         ]
      },
      {
         question: 'Bagaimana Anda menilai kualitas konten edukasi yang disediakan oleh platform investasi?',
         options: [
            { text: 'Platform dengan konten edukasi yang sangat komprehensif dan bermanfaat sangat berharga bagi saya.', weight: 0.3, app: 'Stockbit' },
            { text: 'Konten edukasi yang cukup baik dan membantu memahami investasi merupakan pilihan saya.', weight: 0.02, app: 'IPOT' },
            { text: 'Saya menghargai platform yang menyediakan konten edukasi dasar, tetapi tidak terlalu mendalam.', weight: 0.15, app: 'Ajaib' },
            { text: 'Konten edukasi terbatas yang tidak banyak membantu kurang sesuai dengan kebutuhan saya.', weight: 0.005, app: 'Bareksa' },
            { text: 'Konten edukasi yang hampir tidak bermanfaat tidak sesuai dengan preferensi saya.', weight: 0.005, app: 'Bibit' }
         ]
      },
      // Kriteria 3: Biaya Transaksi (Transaction Costs)
      {
         question: 'Seberapa penting biaya transaksi dalam memilih platform investasi bagi Anda?',
         options: [
            { text: 'Biaya transaksi yang sangat rendah adalah prioritas utama saya dalam memilih platform.', weight: 0.0625, app: 'Ajaib' },
            { text: 'Saya memperhatikan biaya transaksi, tetapi juga memperhitungkan fitur lain yang ditawarkan.', weight: 0.0375, app: 'Bareksa' },
            { text: 'Biaya transaksi menjadi pertimbangan, namun dukungan pelanggan yang berkualitas lebih penting bagi saya.', weight: 0.0125, app: 'Stockbit' },
            { text: 'Biaya transaksi kurang penting, terutama jika platform menyediakan berbagai instrumen investasi.', weight: 0.00625, app: 'Bibit' },
            { text: 'Biaya transaksi hampir tidak penting, karena saya lebih memprioritaskan kemudahan penggunaan.', weight: 0.00625, app: 'IPOT' }
         ]
      },
      {
         question: 'Bagaimana Anda menilai biaya transaksi yang dikenakan oleh platform investasi?',
         options: [
            { text: 'Biaya transaksi yang sangat rendah dan kompetitif membuat platform ini menjadi pilihan saya.', weight: 0.0625, app: 'Ajaib' },
            { text: 'Biaya transaksi yang cukup rendah, meskipun ada biaya tambahan, masih saya anggap wajar.', weight: 0.0375, app: 'Bareksa' },
            { text: 'Saya memilih platform dengan biaya transaksi yang moderat jika sesuai dengan layanan yang diberikan.', weight: 0.0375, app: 'Stockbit' },
            { text: 'Biaya transaksi yang agak tinggi dapat diterima jika layanan yang diberikan masih memadai.', weight: 0.01875, app: 'Bibit' },
            { text: 'Biaya transaksi yang tinggi tidak menjadi kendala buat saya.', weight: 0.01875, app: 'IPOT' }
         ]
      },
      // Kriteria 4: Keamanan (Security)
      {
         question: 'Seberapa penting keamanan data dan dana dalam memilih platform investasi bagi Anda?',
         options: [
            { text: 'Saya memprioritaskan platform dengan fitur keamanan yang sangat kuat untuk melindungi data dan dana saya.', weight: 0.05, app: 'IPOT' },
            { text: 'Keamanan yang baik penting bagi saya, tetapi saya juga memperhatikan biaya transaksi dan fitur edukasi.', weight: 0.03, app: 'Stockbit' },
            { text: 'Keamanan menjadi pertimbangan, tetapi saya lebih fokus pada kemudahan penggunaan.', weight: 0.01, app: 'Bibit' },
            { text: 'Keamanan kurang penting, karena saya lebih memperhitungkan ketersediaan instrumen investasi.', weight: 0.005, app: 'Ajaib' },
            { text: 'Keamanan hampir tidak penting jika saya lebih fokus pada fitur edukasi.', weight: 0.005, app: 'Bareksa' }
         ]
      },
      {
         question: 'Bagaimana Anda menilai fitur keamanan yang disediakan oleh platform investasi?',
         options: [
            { text: 'Fitur keamanan yang sangat canggih dan memenuhi standar industri membuat saya memilih platform ini.', weight: 0.04, app: 'IPOT' },
            { text: 'Fitur keamanan yang baik dan terpercaya sangat penting bagi saya.', weight: 0.03, app: 'Stockbit' },
            { text: 'Saya menghargai fitur keamanan yang memadai meskipun tidak terlalu menonjol.', weight: 0.02, app: 'Bibit' },
            { text: 'Fitur keamanan yang tidak terlalu lengkap kurang sesuai dengan harapan saya.', weight: 0.015, app: 'Ajaib' },
            { text: 'Fitur keamanan yang terbatas memerlukan peningkatan untuk memenuhi kebutuhan saya.', weight: 0.015, app: 'Bareksa' }
         ]
      },
      // Kriteria 5: Dukungan Pelanggan (Customer Support)
      {
         question: 'Bagaimana Anda menilai kualitas dukungan pelanggan yang disediakan oleh berbagai pilihan aplikasi investasi?',
         options: [
            { text: 'Dukungan pelanggan yang sangat baik dengan waktu respons cepat dan berbagai saluran komunikasi adalah prioritas utama saya.', weight: 0.04, app: 'Bareksa' },
            { text: 'Dukungan pelanggan yang baik dan responsif sangat saya hargai.', weight: 0.03, app: 'Ajaib' },
            { text: 'Dukungan pelanggan yang memadai, meskipun mungkin memerlukan waktu lebih lama, masih saya pertimbangkan.', weight: 0.02, app: 'Stockbit' },
            { text: 'Dukungan pelanggan yang terbatas dan waktu respons yang lebih lambat kurang sesuai dengan kebutuhan saya.', weight: 0.015, app: 'IPOT' },
            { text: 'Dukungan pelanggan yang tidak memadai dan kurang responsif kurang sesuai dengan ekspektasi saya.', weight: 0.015, app: 'Bibit' }
         ]
      },
      // Kriteria 6: Ketersediaan Instrumen Investasi (Availability of Investment Instruments)
      {
         question: 'Seberapa penting ketersediaan berbagai instrumen investasi dalam memilih platform investasi bagi Anda?',
         options: [
            { text: 'Ketersediaan berbagai instrumen investasi sangat penting bagi saya karena memungkinkan diversifikasi yang luas.', weight: 0.025, app: 'IPOT' },
            { text: 'Ketersediaan instrumen investasi cukup penting, tetapi saya juga mempertimbangkan faktor lain seperti biaya transaksi.', weight: 0.015, app: 'Stockbit' },
            { text: 'Ketersediaan instrumen investasi agak penting, tetapi saya lebih fokus pada kemudahan penggunaan.', weight: 0.005, app: 'Ajaib' },
            { text: 'Ketersediaan instrumen investasi kurang penting jika aplikasi memenuhi kriteria lainnya.', weight: 0.0025, app: 'Bareksa' },
            { text: 'Ketersediaan instrumen investasi hampir tidak penting, karena saya lebih memprioritaskan fitur edukasi.', weight: 0.0025, app: 'Bibit' }
         ]
      },
      {
         question: 'Bagaimana Anda menilai ketersediaan berbagai instrumen investasi dari pilihan yang ada di pasar?',
         options: [
            { text: 'Pilihan dengan berbagai instrumen investasi yang luas memberikan fleksibilitas yang saya cari.', weight: 0.02, app: 'IPOT' },
            { text: 'Opsi yang menyediakan beragam instrumen investasi, meskipun tidak selengkap yang lain, masih memenuhi kebutuhan saya.', weight: 0.015, app: 'Stockbit' },
            { text: 'Pilihan yang memadai dalam hal instrumen investasi, meskipun tidak terlalu luas, masih dapat diterima.', weight: 0.01, app: 'Ajaib' },
            { text: 'Ketersediaan instrumen investasi yang terbatas kurang sesuai dengan kebutuhan diversifikasi saya.', weight: 0.025, app: 'Bareksa' },
            { text: 'Pilihan instrumen investasi yang sangat terbatas tidak mendukung diversifikasi yang saya inginkan.', weight: 0.025, app: 'Bibit' }
         ]
      }
   ];


   let currentQuestionIndex = 0;
   let totalWeight = {
      Bibit: 0,
      Stockbit: 0,
      IPOT: 0,
      Ajaib: 0,
      Bareksa: 0
   };

   function loadQuestion() {
      const question = questions[currentQuestionIndex];
      quizContainer.innerHTML = `
       <h2 class="text-2xl sm:text-2xl md:text-5xl capitalize font-bold mb-4">${question.question}</h2>
       ${question.options.map((option, index) => `
           <div class="card mb-2" data-value="${option.weight}" data-app="${option.app}">
               <input type="radio" id="option${index}" name="option" value="${option.weight}" class="mr-2" />
               <label for="option${index}" class="cursor-pointer">${option.text}</label>
           </div>
       `).join('')}
   `;
      nextBtn.classList.remove('hidden');

      // Add event listener for card selection
      document.querySelectorAll('.card').forEach(card => {
         card.addEventListener('click', function () {
            document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            this.querySelector('input').checked = true;
         });
      });
   }

   function handleNext() {
      const selectedOption = document.querySelector('input[name="option"]:checked');
      if (selectedOption) {
         const selectedCard = selectedOption.parentElement;
         const appName = selectedCard.getAttribute('data-app');
         const weight = parseFloat(selectedOption.value);
         if (appName && totalWeight.hasOwnProperty(appName)) {
            totalWeight[appName] += weight;
            console.log(`App: ${appName}, Added Weight: ${weight}, Total Weight: ${totalWeight[appName]}`);
         }
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
      const sortedResults = Object.entries(totalWeight).sort((a, b) => b[1] - a[1]);
      const bestApp = sortedResults[0][0];
      const secondBestApp = sortedResults[1][0];

      const reasons = {
         Bibit: 'Bibit dipilih karena menawarkan kemudahan penggunaan dan fitur edukasi yang sangat baik.',
         Stockbit: 'Stockbit terpilih karena biaya transaksi yang kompetitif dan dukungan pelanggan yang baik.',
         IPOT: 'IPOT unggul dalam ketersediaan instrumen investasi dan keamanan data yang tinggi.',
         Ajaib: 'Ajaib menawarkan biaya transaksi rendah dan dukungan pelanggan yang responsif.',
         Bareksa: 'Bareksa memiliki fitur edukasi yang solid dan biaya transaksi yang wajar.'
      };

      const newWindow = window.open('', '_blank');
      newWindow.document.write(`
   <html>
   <head>
      <!-- Favicon -->
      <link rel="icon" href="/assets/SPK_LOGO.jpg" type="image/x-icon">

      <meta name="description" content="BlackMarket - Your go-to platform for making informed investment decisions. Explore comprehensive guides, tools, and resources to navigate financial markets with ease.">
      
      <!-- Viewport Meta Tag -->
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <!-- CSS Links -->
      <link rel="stylesheet" href="/dist/output.css">
      <link rel="stylesheet" href="/dist/input.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.css">

      <!-- Google Fonts -->
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">

      <title>Start investing and find the best application for you on this website. My best application is ${bestApp}. Check it out and find the app that suits your needs!</title>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      <script type="text/javascript" src="https://platform-api.sharethis.com/js/sharethis.js#property=669a9699cc04fc0019b7640e&product=inline-share-buttons&source=platform" async="async"></script>
      
      <style>
         /* CSS for fade-in effect */
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
      <!-- NAVBAR SECTION STARTED -->
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
      <!-- NAVBAR SECTION ENDED -->

      <div class="mb-8 text-center">
         <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black capitalize">Start Your <span class="text-pink-500">Investment</span> Journey with <span class="text-pink-500">${bestApp}</span></h2>
         <p class="mt-4 font-light">Your best application is <strong class="font-semibold">${bestApp}</strong> based on the selected criteria.</p>
         <p class="font-light">The second best option is <strong class="font-semibold">${secondBestApp}</strong>.</p>
      </div>
      <img src="/assets/${bestApp}.png" alt="" class="rounded-lg shadow-button mb-4 w-full max-w-sm mx-auto">
      
      <br>
      
      <div class="sharethis-inline-share-buttons"></div>
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
