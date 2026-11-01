// Ingredient library. Generated from the transformation report's verified ingredient map (1 Nov 2026).
// Tradition and evidence are kept separate; no claim goes beyond the cited source.
export interface Ingredient { slug: string; name: string; localName: string; inci: string; group: string; what: string; tradition: string; evidence: string; how: string; concerns: string; limits: string; products: string[]; source: { url: string; title: string } | null }
export const ingredients: Ingredient[] = [
 {
  "slug": "aloe-vera",
  "name": "Aloe vera",
  "localName": "Ghritkumari",
  "inci": "Aloe Barbadensis Leaf Juice / Leaf Extract (site lists 'Aloe Barbadensis Leaf Gel'; confirm INCI)",
  "group": "Hydrating",
  "what": "The clear gel inside the leaves of the aloe plant, known in many Indian homes as ghritkumari.",
  "tradition": "Used at home for generations on minor sunburn and dry skin.",
  "evidence": "The gel is mostly water with polysaccharides. Reviews describe moisturising and soothing properties; much of the research is laboratory or small studies, so it is best described as a light hydrator that feels cooling.",
  "how": "Leaves a light layer that holds water on the skin surface; feels cool.",
  "concerns": "Dryness, skin that feels tight or warm after sun or shaving.",
  "limits": "Rare allergy; patch test. Do not describe it as treating burns or acne.",
  "products": [
   "pure-aloe-vera-gel",
   "aloe-vera-gel-with-vitamin-e",
   "aloe-vera-gel-with-rose-oil",
   "rose-hydrating-mist",
   "tea-tree-purifying-mist",
   "eucalyptus-soothing-mist",
   "aloe-vera-bathing-bar",
   "ubtan-bathing-bar",
   "fig-vanilla-shower-wash"
  ],
  "source": {
   "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2763764/",
   "title": "Surjushe et al., Aloe vera: a short review, Indian J Dermatol 2008"
  }
 },
 {
  "slug": "rose",
  "name": "Rose (Damask rose)",
  "localName": "Gulab",
  "inci": "Rosa Damascena Flower Water; Rosa Damascena Flower Oil",
  "group": "Plant waters",
  "what": "Rose water is the fragrant water collected when rose petals are steam-distilled; rose oil is the concentrated oil.",
  "tradition": "Gulab jal has long been used in Indian homes as a face freshener.",
  "evidence": "Valued mainly for its scent and as a gentle, refreshing water. Pharmacological reviews cover many uses, mostly not on skin, so skin claims should stay modest.",
  "how": "Adds water and a soft scent; makes a mist feel pleasant to use.",
  "concerns": "Refreshing dry or tired-looking skin.",
  "limits": "Fragrance compounds can bother very sensitive skin.",
  "products": [
   "rose-hydrating-mist",
   "aloe-vera-gel-with-rose-oil",
   "hibiscus-rose-soap"
  ],
  "source": {
   "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3586833/",
   "title": "Boskabady et al., Rosa damascena review, Iran J Basic Med Sci 2011"
  }
 },
 {
  "slug": "moringa",
  "name": "Moringa seed oil",
  "localName": "Sahjan, drumstick",
  "inci": "Moringa Oleifera Seed Oil",
  "group": "Oils & butters",
  "what": "Oil pressed from the seeds of the drumstick tree (sahjan). Our seeds are dried in the sun before they are pressed.",
  "tradition": "Drumstick is a familiar kitchen plant across India; the seed oil has a long history of cosmetic use.",
  "evidence": "A light, stable oil, high in oleic acid according to commonly published compositions (confirm with supplier's certificate of analysis). It works as an emollient: it softens and smooths. Claims about elasticity or ageing are not established.",
  "how": "Fills the gaps between surface skin cells so skin feels softer and less dry.",
  "concerns": "Dry skin, especially at night and in winter.",
  "limits": "Use 2 to 3 drops; oily or acne-prone skin may prefer less.",
  "products": [
   "cold-pressed-moringa-oil"
  ],
  "source": null
 },
 {
  "slug": "turmeric",
  "name": "Turmeric (haldi)",
  "localName": "Haldi",
  "inci": "Curcuma Longa Root Powder (confirm)",
  "group": "Traditional Indian",
  "what": "The dried, ground root of the turmeric plant.",
  "tradition": "Central to ubtan and the haldi ceremony before Indian weddings.",
  "evidence": "A systematic review found early clinical evidence for some skin uses of turmeric, with study quality still limited. In a rinse-off bar its contact time is short, so describe it as traditional rather than as a treatment.",
  "how": "In an ubtan bar it adds colour and a traditional feel; chickpea flour gives gentle polish.",
  "concerns": "Dull-looking skin as part of a weekly ritual.",
  "limits": "Can stain light fabrics and nails; patch test.",
  "products": [
   "ubtan-bathing-bar"
  ],
  "source": {
   "url": "https://pubmed.ncbi.nlm.nih.gov/27213821/",
   "title": "Vaughn et al., Turmeric and skin health, Phytother Res 2016"
  }
 },
 {
  "slug": "tea-tree",
  "name": "Tea tree leaf water",
  "localName": "",
  "inci": "Melaleuca Alternifolia Leaf Water (confirm)",
  "group": "Plant waters",
  "what": "The water left after distilling tea tree leaves (a hydrosol), not the concentrated tea tree oil.",
  "tradition": "Tea tree is an Australian plant; its oil became popular worldwide for oily skin.",
  "evidence": "Most research is on tea tree OIL, which has antimicrobial properties in laboratory studies and some clinical use for mild acne. A leaf water contains far smaller amounts of those compounds, so oil studies cannot be borrowed for this product.",
  "how": "A fresh, herbal mist that feels clarifying on oily skin.",
  "concerns": "Oily and combination skin that wants a light refresh.",
  "limits": "Avoid eyes; stop if irritation occurs. Do not claim it treats acne.",
  "products": [
   "tea-tree-purifying-mist"
  ],
  "source": {
   "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC1360273/",
   "title": "Carson et al., Tea tree oil review, Clin Microbiol Rev 2006"
  }
 },
 {
  "slug": "eucalyptus-witch-hazel",
  "name": "Eucalyptus water and witch hazel",
  "localName": "Nilgiri",
  "inci": "Eucalyptus Globulus Leaf Water (species to confirm); Hamamelis Virginiana Water (confirm)",
  "group": "Plant waters",
  "what": "Two plant waters in the Eucalyptus Soothing Mist: eucalyptus for a cool, fresh smell, and witch hazel, traditionally used as a mild astringent.",
  "tradition": "Witch hazel water is a long-standing toner ingredient.",
  "evidence": "Limited skin-specific evidence; describe the cooling feel, not medical effects.",
  "how": "Cool, fresh sensation; may feel tightening on oily skin.",
  "concerns": "Hot, humid days; post-workout refresh.",
  "limits": "Strong scents can bother sensitive skin; avoid eyes.",
  "products": [
   "eucalyptus-soothing-mist"
  ],
  "source": null
 },
 {
  "slug": "kuppaimeni",
  "name": "Kuppaimeni (Indian nettle)",
  "localName": "Indian nettle",
  "inci": "Acalypha Indica Extract (confirm)",
  "group": "Traditional Indian",
  "what": "A common wayside plant, called kuppaimeni in Tamil.",
  "tradition": "Used in Siddha and household remedies, including on skin.",
  "evidence": "Scientific reviews describe its traditional uses and laboratory findings; there are no published cosmetic studies we could find. Present it as a traditional ingredient.",
  "how": "Part of a mild cold-process soap with coconut and castor oils.",
  "concerns": "Everyday body cleansing for those who like traditional ingredients.",
  "limits": "Patch test; describe tradition, not results.",
  "products": [
   "kuppaimeni-soap"
  ],
  "source": {
   "url": "https://phcogrev.com/node/474",
   "title": "Review of Acalypha indica, Pharmacognosy Reviews"
  }
 },
 {
  "slug": "desi-cow-ghee",
  "name": "Desi cow ghee",
  "localName": "Ghee",
  "inci": "No standard INCI listed; founder to confirm label name",
  "group": "Oils & butters",
  "what": "Clarified butter made from cow's milk.",
  "tradition": "Applied to cracked heels and dry lips in many Indian homes.",
  "evidence": "A rich fat that acts as an emollient and seals in moisture; clinical cosmetic studies are scarce. Our founder reports that older customers reorder the ghee foot butter for cracked heels.",
  "how": "Forms a soft, protective layer that slows water loss.",
  "concerns": "Dry, rough heels and dry lips.",
  "limits": "Animal-derived: products with ghee are not vegan.",
  "products": [
   "avocado-olive-ghee-foot-butter",
   "beetroot-ghee-lip-balm",
   "licorice-cocoa-ghee-lip-balm"
  ],
  "source": null
 },
 {
  "slug": "shea-butter",
  "name": "Shea butter",
  "localName": "",
  "inci": "Butyrospermum Parkii Butter",
  "group": "Oils & butters",
  "what": "A plant butter from the nut of the African shea tree.",
  "tradition": "Long used in West Africa on skin and hair.",
  "evidence": "A widely used emollient in cosmetics.",
  "how": "Softens and helps skin feel less dry.",
  "concerns": "Dry skin, heels, lips; adds creaminess to soaps.",
  "limits": "Rare nut-related sensitivity.",
  "products": [
   "cow-milk-bathing-bar",
   "kuppaimeni-soap",
   "tomato-extract-soap",
   "avocado-olive-ghee-foot-butter",
   "beetroot-ghee-lip-balm"
  ],
  "source": null
 },
 {
  "slug": "vitamin-e",
  "name": "Vitamin E",
  "localName": "",
  "inci": "Tocopheryl Acetate (gel); Tocopherol (soap, confirm)",
  "group": "Hydrating",
  "what": "A fat-soluble antioxidant; the acetate form is common in cosmetics.",
  "tradition": "Not a traditional ingredient; a vitamin widely used in modern skin care.",
  "evidence": "A dermatology review describes vitamin E as an antioxidant widely used in skin care; effects depend on form and amount.",
  "how": "Adds antioxidant support to the formula and a softer feel.",
  "concerns": "Drier skin.",
  "limits": "Allergic reactions are uncommon but possible.",
  "products": [
   "aloe-vera-gel-with-vitamin-e",
   "tomato-extract-soap"
  ],
  "source": {
   "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4976416/",
   "title": "Keen & Hassan, Vitamin E in dermatology, IDOJ 2016"
  }
 },
 {
  "slug": "licorice",
  "name": "Licorice root (mulethi)",
  "localName": "Mulethi",
  "inci": "Glycyrrhiza Glabra Root Extract (confirm)",
  "group": "Traditional Indian",
  "what": "Extract of licorice root, known in India as mulethi.",
  "tradition": "Used in home remedies and Ayurvedic preparations.",
  "evidence": "Some licorice compounds have been studied for uneven pigmentation, mostly in the lab. A lip-balm 'dark spot repair' claim would need product-level proof.",
  "how": "Part of a ghee-based lip balm.",
  "concerns": "Dry lips.",
  "limits": "Avoid 'repair' and 'brightening' claims unless tested.",
  "products": [
   "licorice-cocoa-ghee-lip-balm"
  ],
  "source": null
 },
 {
  "slug": "bhringraj-brahmi-amla",
  "name": "Bhringraj, brahmi and amla",
  "localName": "",
  "inci": "Eclipta Prostrata, Bacopa Monnieri, Phyllanthus Emblica extracts (confirm)",
  "group": "Traditional Indian",
  "what": "Three herbs traditionally used in Indian hair oils.",
  "tradition": "Classic ingredients in home-made hair oils for scalp massage.",
  "evidence": "Claims about hair growth or stopping hair fall need product-level clinical proof; present these oils as conditioning oils for a scalp-massage ritual.",
  "how": "Oil + massage softens dry hair and scalp.",
  "concerns": "Dry scalp and dry-feeling hair.",
  "limits": "Patch test; wash out after an hour or overnight.",
  "products": [
   "red-onion-hair-oil",
   "bringa-brahmi-hair-oil"
  ],
  "source": null
 }
];
export const otherIngredients: { name: string; products: string[] }[] = [
 {
  "name": "Chickpea flour (besan)",
  "products": [
   "ubtan-bathing-bar"
  ]
 },
 {
  "name": "Sandalwood",
  "products": [
   "ubtan-bathing-bar"
  ]
 },
 {
  "name": "Cow milk",
  "products": [
   "cow-milk-bathing-bar"
  ]
 },
 {
  "name": "Coconut oil",
  "products": [
   "aloe-vera-bathing-bar",
   "cow-milk-bathing-bar",
   "ubtan-bathing-bar",
   "kuppaimeni-soap",
   "tomato-extract-soap",
   "red-onion-hair-oil",
   "bringa-brahmi-hair-oil"
  ]
 },
 {
  "name": "Olive oil",
  "products": [
   "aloe-vera-bathing-bar",
   "hibiscus-rose-soap",
   "avocado-olive-ghee-foot-butter"
  ]
 },
 {
  "name": "Castor oil",
  "products": [
   "kuppaimeni-soap",
   "tomato-extract-soap",
   "red-onion-hair-oil",
   "bringa-brahmi-hair-oil"
  ]
 },
 {
  "name": "Hibiscus (jaswand)",
  "products": [
   "hibiscus-rose-soap",
   "red-onion-hair-oil",
   "bringa-brahmi-hair-oil"
  ]
 },
 {
  "name": "Tomato extract",
  "products": [
   "tomato-extract-soap"
  ]
 },
 {
  "name": "Fig and vanilla extracts",
  "products": [
   "fig-vanilla-shower-wash"
  ]
 },
 {
  "name": "Avocado oil",
  "products": [
   "avocado-olive-ghee-foot-butter"
  ]
 },
 {
  "name": "Jojoba oil",
  "products": [
   "avocado-olive-ghee-foot-butter"
  ]
 },
 {
  "name": "Almond oil",
  "products": [
   "hibiscus-rose-soap",
   "avocado-olive-ghee-foot-butter"
  ]
 },
 {
  "name": "Sesame / black sesame oil",
  "products": [
   "avocado-olive-ghee-foot-butter",
   "red-onion-hair-oil",
   "bringa-brahmi-hair-oil"
  ]
 },
 {
  "name": "Beeswax",
  "products": [
   "avocado-olive-ghee-foot-butter"
  ]
 },
 {
  "name": "Beetroot extract",
  "products": [
   "beetroot-ghee-lip-balm"
  ]
 },
 {
  "name": "Prickly pear extract",
  "products": [
   "beetroot-ghee-lip-balm"
  ]
 },
 {
  "name": "Cocoa powder",
  "products": [
   "licorice-cocoa-ghee-lip-balm"
  ]
 },
 {
  "name": "Onion juice",
  "products": [
   "red-onion-hair-oil",
   "bringa-brahmi-hair-oil"
  ]
 },
 {
  "name": "Rosehip seed oil",
  "products": [
   "hibiscus-rose-soap"
  ]
 },
 {
  "name": "Glycerin",
  "products": [
   "fig-vanilla-shower-wash"
  ]
 }
];
export const ingredientBySlug = (s: string) => ingredients.find(i => i.slug === s);
