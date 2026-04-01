const API_KEY = import.meta.env.VITE_API_KEY;

let element = document.querySelector('#quote-container');

//update footer year automatically
document.querySelector('#year').innerText = new Date().getFullYear()

const fetchQuotes = async () => {
    try{
        const response = await fetch(`https://api.api-ninjas.com/v1/quotes`, {
        headers: { 'X-Api-Key': API_KEY }
        });

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}, COULDN'T GET DATA!!`);
        }
    
    const quotes = await response.json();
    console.log(quotes);
    
    
    element.innerHTML = `<div id="quote-section">
        <div id='top-description'>
        <h3 id = 'author'><strong class='bold-a'>Author:</strong> ${quotes[0].author}</h3>
        <h4 id = 'category'><strong class='bold-a'>Category:</strong>  ${quotes[0].category}</h4>
        </div>
        <blockquote id = 'quote'>${quotes[0].quote}</blockquote>
         <button id="share" style="border-radius: 10px;"><i class="fa-regular fa-share-from-square fa-lg"></i></i></button>
        </div>`;

    }catch(e){
        console.error("Error:", e);
        window.alert('Unable to get data!!');
    }
   
};
//web share API
const shareQuote = async (quote, author) => {
    const shareText = `"${quote}" — ${author}`;

  if (navigator.share) {
    await navigator.share({
      title: 'Quote',
      text: shareText,
      url: window.location.href // optional, share the app link
    })
    .then(() => console.log('Quote shared successfully!'))
    .catch((err) => console.error('Error sharing:', err));
  }  else if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      alert('Quote copied to clipboard! Paste it anywhere you like.');
    } catch {
      alert('Sharing not supported and copying failed.');
    }
  } else {
    alert('Sharing is not supported in this browser.');
  }
};
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('quote-container').addEventListener('click', (e) => {
  if (e.target.closest('#share')) {
    const quote = document.getElementById('quote').innerText;
    const author = document.getElementById('author').innerText;
    console.log(quote);
    
    shareQuote(quote,author);
  }
});
    let button = document.querySelector('#get')
    let hasAnimated = false;
    let quoteContent = async () => {
        element.style.display = 'block';
        // Fade out old content only if it exists
        if (document.querySelector('#author') && document.querySelector('#category') && document.querySelector('#quote') && document.querySelector('#quote-section')) {
            // Fade out existing content
            gsap.to('#author', {
                opacity: 0,
                y: -20, 
                duration: 0.3, 
                ease: 'power1.out'
                });
            gsap.to('#category', {
                opacity: 0, 
                y: -20, 
                duration: 0.3, 
                ease: 'power1.out'
            });
            gsap.to('#quote', {
                opacity: 0, 
                scale: 0, 
                transformOrigin: 'top left', 
                duration: 0.2, 
                ease: 'power1.out'
            });
        }            

        await fetchQuotes();

        if(hasAnimated === false) {
            hasAnimated = true; 
            gsap.from('#get', {
                y:-20, 
                duration:1, 
                ease: 'bounce.out'
            })
            }
            gsap.from('#author', {
                opacity:0, 
                y:-40, 
                ease: 'power.out', 
                duration:.5
            })
            gsap.from('#category', {
                opacity:0, 
                y:-40, 
                ease: 'power.out', 
                duration:.5
            })
            gsap.from('#quote', {
                scale:0.5, 
                transformOrigin: 'top right', 
                ease: 'power.out', 
                duration:.2
            })
        }
    button.addEventListener("click", quoteContent);
    
});
