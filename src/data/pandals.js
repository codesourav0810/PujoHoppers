import rawPandals from "../../siliguri_pandals.json";

// HD Durga Puja pandal & idol photos (Pexels — "Durga Puja pandal" keyword)
// All images are high-resolution festival photography of decorated pandals and idols.
const DURGA_PUJA_PANDAL_IMAGES = [
  // Page 1 of search
  "https://images.pexels.com/photos/34601642/pexels-photo-34601642.jpeg", // Durga Puja celebration in Kolkata
  "https://images.pexels.com/photos/28832091/pexels-photo-28832091.jpeg", // Intricately decorated Durga Puja pandal ceiling
  "https://images.pexels.com/photos/18888233/pexels-photo-18888233.jpeg", // Crowds gather at stunning Durga Puja pandal
  "https://images.pexels.com/photos/27364815/pexels-photo-27364815.jpeg", // Vibrant ceremonial Durga idol
  "https://images.pexels.com/photos/28832088/pexels-photo-28832088.jpeg", // Intricate Durga idol at Kolkata festival
  "https://images.pexels.com/photos/9965072/pexels-photo-9965072.jpeg", // Colorful intricate sculpture in Hindu temple
  "https://images.pexels.com/photos/34126201/pexels-photo-34126201.jpeg", // Vibrant Durga Puja festival celebration
  "https://images.pexels.com/photos/39127575/pexels-photo-39127575.jpeg", // Colorful Durga Puja pandal in Kolkata
  "https://images.pexels.com/photos/18362622/pexels-photo-18362622.jpeg", // Sculptures inside 66 pally pandal
  "https://images.pexels.com/photos/18847272/pexels-photo-18847272.jpeg", // Abol Tabol Puja pandal Kolkata
  "https://images.pexels.com/photos/29479068/pexels-photo-29479068.jpeg", // Intricate Durga idol display
  "https://images.pexels.com/photos/34060187/pexels-photo-34060187.jpeg", // Durga Puja celebration at venue
  "https://images.pexels.com/photos/13875401/pexels-photo-13875401.jpeg", // Durga Puja festival Bhubaneswar
  "https://images.pexels.com/photos/33987684/pexels-photo-33987684.jpeg", // Intricate Durga Puja idol with illuminations
  "https://images.pexels.com/photos/18971810/pexels-photo-18971810.jpeg", // Illuminated interior religious statues
  "https://images.pexels.com/photos/34041253/pexels-photo-34041253.jpeg", // Colorful Durga Puja celebration temple
  "https://images.pexels.com/photos/34485048/pexels-photo-34485048.jpeg", // Vibrant Durga Puja festival decor
  // Page 2 of search
  "https://images.pexels.com/photos/28949411/pexels-photo-28949411.jpeg", // Vibrant Durga Puja display
  "https://images.pexels.com/photos/14260876/pexels-photo-14260876.jpeg", // Hindu goddesses in golden decor
  "https://images.pexels.com/photos/34096937/pexels-photo-34096937.jpeg", // Goddess Durga idol in vibrant puja pandal
  "https://images.pexels.com/photos/34041256/pexels-photo-34041256.jpeg", // Intricate Durga Puja idol in Kolkata temple
  "https://images.pexels.com/photos/18900082/pexels-photo-18900082.jpeg", // Statue of Durga
  "https://images.pexels.com/photos/28945204/pexels-photo-28945204.jpeg", // Intricate Durga Puja idol in Kolkata
  "https://images.pexels.com/photos/38344764/pexels-photo-38344764.jpeg", // Intricate Durga Puja idol display
  "https://images.pexels.com/photos/14191274/pexels-photo-14191274.jpeg", // Altar with Hindu goddess sculptures
  "https://images.pexels.com/photos/39654464/pexels-photo-39654464.jpeg", // Intricate Durga idol in vibrant festival decor
  "https://images.pexels.com/photos/19061291/pexels-photo-19061291.jpeg", // Sculpture in traditional temple
  "https://images.pexels.com/photos/28938866/pexels-photo-28938866.jpeg", // Intricate Durga Puja idol in traditional attire
  "https://images.pexels.com/photos/34199053/pexels-photo-34199053.jpeg", // Colorful Durga Puja pandal in Kolkata
  "https://images.pexels.com/photos/33780153/pexels-photo-33780153.jpeg", // Intricate goddess Durga idol in Kolkata
  "https://images.pexels.com/photos/6027573/pexels-photo-6027573.jpeg", // Grayscale photo of Hindu idol
  "https://images.pexels.com/photos/28948275/pexels-photo-28948275.jpeg", // Vibrant Durga Puja festival idol display
  "https://images.pexels.com/photos/34093362/pexels-photo-34093362.jpeg", // Vibrant Durga Puja festival celebration
  "https://images.pexels.com/photos/34325584/pexels-photo-34325584.jpeg", // Intricate Durga Puja idol with multiple arms
  "https://images.pexels.com/photos/28913920/pexels-photo-28913920.jpeg", // Vibrant Durga Puja festival decoration in India
  "https://images.pexels.com/photos/34214380/pexels-photo-34214380.jpeg", // Intricate Durga idol at Kolkata festival
  "https://images.pexels.com/photos/29195656/pexels-photo-29195656.jpeg", // Colorful Durga Puja pandal with vibrant deities
  "https://images.pexels.com/photos/9965068/pexels-photo-9965068.jpeg", // Symmetrical view of Hindu festival decoration
  // Page 3 of search
  "https://images.pexels.com/photos/30090533/pexels-photo-30090533.jpeg", // Exquisite Durga Puja idol in grand temple
  "https://images.pexels.com/photos/34743730/pexels-photo-34743730.jpeg", // Stunning Durga Puja festival decoration
  "https://images.pexels.com/photos/9965047/pexels-photo-9965047.jpeg", // Illuminated statue of god
  "https://images.pexels.com/photos/37976979/pexels-photo-37976979.jpeg", // Vibrant Durga Puja celebration with idols
  "https://images.pexels.com/photos/32556771/pexels-photo-32556771.jpeg", // Intricate Durga Puja idol in Kolkata exhibition
  "https://images.pexels.com/photos/28900367/pexels-photo-28900367.jpeg", // Magnificent Durga idol celebrated in Kolkata
  "https://images.pexels.com/photos/9965056/pexels-photo-9965056.jpeg", // Durga Puja goddess sculpture
  "https://images.pexels.com/photos/18972995/pexels-photo-18972995.jpeg", // Man touching religious statue
  "https://images.pexels.com/photos/15873620/pexels-photo-15873620.jpeg", // Colorful Durga goddess statue
  "https://images.pexels.com/photos/38746600/pexels-photo-38746600.jpeg", // Vibrant Durga idol display at Kolkata festival
  "https://images.pexels.com/photos/6138443/pexels-photo-6138443.jpeg", // Grayscale photo of goddess Durga
  "https://images.pexels.com/photos/34068920/pexels-photo-34068920.jpeg", // Intricate Durga idol for Durga Puja festival
  "https://images.pexels.com/photos/34041245/pexels-photo-34041245.jpeg", // Stunning Durga Puja idol in Kolkata festival
  "https://images.pexels.com/photos/29479055/pexels-photo-29479055.jpeg", // Exquisite Durga idol in Kolkata Durga Puja
  "https://images.pexels.com/photos/37926128/pexels-photo-37926128.jpeg", // Vibrant Durga idol at traditional festival
  "https://images.pexels.com/photos/35289041/pexels-photo-35289041.jpeg", // Colorful Durga Puja celebration statue
  "https://images.pexels.com/photos/29195655/pexels-photo-29195655.jpeg", // Intricate Durga Puja idol display with deities
  "https://images.pexels.com/photos/27925605/pexels-photo-27925605.jpeg", // Durga Puja Ballygunge cultural
  "https://images.pexels.com/photos/19170598/pexels-photo-19170598.jpeg", // Golden Hindu altar
  "https://images.pexels.com/photos/18830987/pexels-photo-18830987.jpeg", // Ornamented Durga statue
  // Page 4 of search
  "https://images.pexels.com/photos/34652030/pexels-photo-34652030.jpeg", // Vibrant Durga Puja pandal in New Delhi
  "https://images.pexels.com/photos/34156390/pexels-photo-34156390.jpeg", // Intricate Durga Puja idol in Kolkata
  "https://images.pexels.com/photos/39127576/pexels-photo-39127576.jpeg", // Intricate Durga Puja ceiling and deity display
  "https://images.pexels.com/photos/32742798/pexels-photo-32742798.jpeg", // Vibrant Durga Puja pandal at sunset
  "https://images.pexels.com/photos/33799558/pexels-photo-33799558.jpeg", // Durga Puja festival in Kolkata vibrant idols
  "https://images.pexels.com/photos/33274089/pexels-photo-33274089.jpeg", // Colorful Durga Puja idol with intricate details
  "https://images.pexels.com/photos/10221375/pexels-photo-10221375.jpeg", // Art of Hinduism
  "https://images.pexels.com/photos/14007190/pexels-photo-14007190.jpeg", // Figurines of Hindu deities
  "https://images.pexels.com/photos/35230344/pexels-photo-35230344.jpeg", // Vibrant Durga Puja decoration in temple
  "https://images.pexels.com/photos/21046826/pexels-photo-21046826.jpeg", // People standing in front of Durga Puja pandal
  "https://images.pexels.com/photos/29195654/pexels-photo-29195654.jpeg", // Vibrant Durga Puja festival celebration in Kolkata
  "https://images.pexels.com/photos/34037415/pexels-photo-34037415.jpeg", // Vibrant Durga Puja celebration in Nagpur
  "https://images.pexels.com/photos/29195656/pexels-photo-29195656.jpeg", // (colorful pandal deities - alternate)
  "https://images.pexels.com/photos/34015751/pexels-photo-34015751.jpeg", // Intricate Durga idol in Kolkata temple
  "https://images.pexels.com/photos/34096937/pexels-photo-34096937.jpeg", // (vibrant puja pandal - alternate)
  "https://images.pexels.com/photos/34041256/pexels-photo-34041256.jpeg", // (intricate idol - alternate)
  "https://images.pexels.com/photos/34041243/pexels-photo-34041243.jpeg", // Statue of Hindu goddess Durga in pandal
  "https://images.pexels.com/photos/29403690/pexels-photo-29403690.jpeg", // Durga idol from Kolkata Durga Puja festival
  "https://images.pexels.com/photos/18102942/pexels-photo-18102942.jpeg", // Display of statues of gods and goddesses
  "https://images.pexels.com/photos/39890850/pexels-photo-39890850.jpeg", // Intricate Durga idol at Kolkata festival
  "https://images.pexels.com/photos/21810088/pexels-photo-21810088.jpeg", // Religious statue of goddess
  "https://images.pexels.com/photos/13005341/pexels-photo-13005341.jpeg", // Close-up photo of Maa Durga
  "https://images.pexels.com/photos/27330485/pexels-photo-27330485.jpeg", // Statue in a room with books
  "https://images.pexels.com/photos/29479049/pexels-photo-29479049.jpeg", // Majestic idol of Goddess Durga during Durga Puja
  "https://images.pexels.com/photos/39065742/pexels-photo-39065742.jpeg", // Colorful Durga Puja idol in Kolkata festival
  "https://images.pexels.com/photos/32543654/pexels-photo-32543654.jpeg", // Vibrant Durga idol during Kolkata festival
  "https://images.pexels.com/photos/37743376/pexels-photo-37743376.jpeg", // Vibrant Durga Puja idol with intricate details
  "https://images.pexels.com/photos/34074565/pexels-photo-34074565.jpeg", // Colorful Durga Puja idol display indoors
  "https://images.pexels.com/photos/33669866/pexels-photo-33669866.jpeg", // Durga Puja idols at Kolkata festival
  "https://images.pexels.com/photos/18830988/pexels-photo-18830988.jpeg", // Ornamented Durga statue
  "https://images.pexels.com/photos/37850927/pexels-photo-37850927.jpeg", // Colorful Durga Puja sculpture close-up
  "https://images.pexels.com/photos/32487010/pexels-photo-32487010.jpeg", // Intricate Durga idol in vibrant attire
  "https://images.pexels.com/photos/32563556/pexels-photo-32563556.jpeg", // Intricate Durga Puja idol display in Kolkata
  "https://images.pexels.com/photos/18847280/pexels-photo-18847280.jpeg", // People in blurred motion in Hindu temple
  "https://images.pexels.com/photos/29403683/pexels-photo-29403683.jpeg", // Intricate Durga idol display in Kolkata
  "https://images.pexels.com/photos/34139768/pexels-photo-34139768.jpeg", // Intricate Durga idol at Kolkata Durga Puja festival
  "https://images.pexels.com/photos/21046829/pexels-photo-21046829.jpeg", // Crowd in front of Hindu pandala
  "https://images.pexels.com/photos/36787158/pexels-photo-36787158.jpeg", // Vibrant Durga Puja festival in Chattogram
  "https://images.pexels.com/photos/9914155/pexels-photo-9914155.jpeg", // Sculpture of Eastern goddess
  "https://images.pexels.com/photos/33571158/pexels-photo-33571158.jpeg", // Intricate Durga idol at Kolkata workshop
  "https://images.pexels.com/photos/33669866/pexels-photo-33669866.jpeg", // (Durga Puja idols at Kolkata festival - alternate)
  "https://images.pexels.com/photos/10221380/pexels-photo-10221380.jpeg", // Kolkata Durga Puja
  "https://images.pexels.com/photos/34283958/pexels-photo-34283958.jpeg", // Durga pooja
  "https://images.pexels.com/photos/28758865/pexels-photo-28758865.jpeg", // Durga idol
  "https://images.pexels.com/photos/18847281/pexels-photo-18847281.jpeg", // Kolkata festival
  "https://images.pexels.com/photos/32664900/pexels-photo-32664900.jpeg", // Durga maa
  "https://images.pexels.com/photos/34193775/pexels-photo-34193775.jpeg", // Durga ma
  "https://images.pexels.com/photos/17264037/pexels-photo-17264037.jpeg", // Navratri festival
  "https://images.pexels.com/photos/34009042/pexels-photo-34009042.jpeg", // Navratri
  "https://images.pexels.com/photos/28945204/pexels-photo-28945204.jpeg", // Durga mata
  "https://images.pexels.com/photos/34412998/pexels-photo-34412998.jpeg", // Kali Puja
  "https://images.pexels.com/photos/13416151/pexels-photo-13416151.jpeg", // Ganesh Chaturthi
  "https://images.pexels.com/photos/33568311/pexels-photo-33568311.jpeg", // Lord Jagannath temple
  "https://images.pexels.com/photos/30184160/pexels-photo-30184160.jpeg", // Mumbai Ganpati
  "https://images.pexels.com/photos/17221371/pexels-photo-17221371.jpeg", // Kerala temple
];

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

// Add Pexels image optimization params for faster loading
function optimizePexelsUrl(url) {
  if (!url || !url.includes("pexels.com")) return url;
  const base = url.split("?")[0];
  return `${base}?auto=compress&cs=tinysrgb&w=600&q=75`;
}

export const pandals = rawPandals.map((pandal, index) => {
  const rawImage = DURGA_PUJA_PANDAL_IMAGES[index % DURGA_PUJA_PANDAL_IMAGES.length];
  const image = optimizePexelsUrl(rawImage);

  return {
    ...pandal,
    id: String(index + 1),
    index: index + 1,
    slug: slugify(pandal.pandal_name),
    image,
    latitude: Number(pandal.latitude),
    longitude: Number(pandal.longitude),
  };
});

export const ALL_ZONES = Array.from(new Set(pandals.map((p) => p.zone))).filter(Boolean);
export const ALL_CATEGORIES = Array.from(new Set(pandals.map((p) => p.category))).filter(Boolean);

export function getAllPandals() {
  return pandals;
}

export function getPandalById(id) {
  if (!id) return null;
  const strId = String(id).toLowerCase();
  return pandals.find((p) => p.id === strId || p.slug === strId || p.pandal_name.toLowerCase() === strId);
}

// Featured pandals — the 19 signature puja committees you selected
const FEATURED_PANDAL_NAMES = [
  "Ujjwal Sangha",
  "Jatiya Shakti Sangha & Pathagar",
  "YMA Club",
  "Swastika Yubak Sangha",
  "Janashree Club",
  "Central Colony Durga Puja Committee",
  "Rathkhola Sporting Club",
  "DadaBhai Sporting Club",
  "Uttorayon Durga Puja",
  "Subrata Sangha",
  "Maya Devi Club",
  "College Para Puja Committee",
  "Rabindra Sangha",
  "Ramkrishna Sangha",
  "Jatiya Tarun Sangha (JTS)",
  "Sukanta Sporting Union Club",
  "Haiderpara Sporting Club",
  "Tarun Tirtha Club",
  "Sanghashree Club",
];

export function getFeaturedPandals(limit = 6) {
  const featured = pandals.filter((p) => FEATURED_PANDAL_NAMES.includes(p.pandal_name));
  if (featured.length >= limit) return featured.slice(0, limit);
  return pandals.slice(0, limit);
}

export function searchPandals({ query = "", zone = "all", category = "all", sort = "default" }) {
  let results = [...pandals];

  const q = query.trim().toLowerCase();
  if (q) {
    results = results.filter((p) => {
      const matchName = p.pandal_name.toLowerCase().includes(q);
      const matchArea = p.area.toLowerCase().includes(q);
      const matchZone = p.zone.toLowerCase().includes(q);
      const matchAddress = (p.venue_address || "").toLowerCase().includes(q);
      const matchTheme = (p.theme || "").toLowerCase().includes(q);
      const matchCategory = (p.category || "").toLowerCase().includes(q);
      return matchName || matchArea || matchZone || matchAddress || matchTheme || matchCategory;
    });
  }

  if (zone && zone !== "all") {
    results = results.filter((p) => p.zone.toLowerCase() === zone.toLowerCase());
  }

  if (category && category !== "all") {
    results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (sort === "name-asc") {
    results.sort((a, b) => a.pandal_name.localeCompare(b.pandal_name));
  } else if (sort === "name-desc") {
    results.sort((b) => b.pandal_name.localeCompare(a.pandal_name));
  } else if (sort === "zone") {
    results.sort((a, b) => a.zone.localeCompare(b.zone));
  } else if (sort === "category") {
    results.sort((a, b) => a.category.localeCompare(b.category));
  }

  return results;
}
