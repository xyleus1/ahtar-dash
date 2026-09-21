import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { memoryArticle } from './memoryArticleInfo'
import './article.css'

// Original article content with the PDF's bolding and the site's plain serif typography.
export default function MemoryArticle({ focusTitle = false }: { focusTitle?: boolean }) {
  const title = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (focusTitle) title.current?.focus({ preventScroll: true })
  }, [focusTitle])
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <main id="main" className="memory-page" tabIndex={-1}>
        <article className="memory-article" aria-labelledby="article-title">
          <header className="memory-header">
            <h1 id="article-title" ref={title} tabIndex={-1}>{memoryArticle.title}</h1>
            <p className="memory-date"><time dateTime={memoryArticle.date}>September 20, 2026</time></p>
            <p className="memory-subtitle">{memoryArticle.subtitle}</p>
          </header>
          <div className="memory-body">
            <p>{"This is my first article that I’m also putting on my personal website: "}<Link to="/">ahtar.dev</Link>{", Give it a look!"}</p>
            <p>{"You’ve probably heard about the “memory wall” in AI infrastructure and the ensuing hype around companies like SK Hynix, whose shares rose 274% in 2025 as demand increased for both conventional memory and the high-bandwidth memory used in AI servers. When trying to build myself a gaming PC this summer, I quickly realized the ‘memory wall’ also meant that the price of consumer DDR5 had almost tripled from $150 to over $500+ for a stick. Everything from phones, laptops, and Nintendo Switches have seen price increases beyond what was expected this year, and much of this is because of exploding RAM prices."}</p>
            <figure>
            <a href={"https://thememoryguy.com/how-high-can-memory-prices-go/"} aria-label="View source: The Memory Guy" title="Source: The Memory Guy"><img src={"/articles/why-do-we-need-so-much-memory-anyway/image1.png"} width={1200} height={821} alt={"Line chart comparing DRAM and NAND, with both series rising steeply at the right-hand end. Source: Objective Analysis."} loading="lazy" decoding="async" /></a>
            </figure>
            <p>{"The memory wall is a result of the mismatch between the development of compute and memory. Chipstrat’s writing referencing Amir Gholami’s research describes that compute has scaled at 3x per two years while memory has only scaled at 1.6x and 1.4x every two years. ."}</p>
            <figure>
            <a href={"https://www.chipstrat.com/p/high-bandwidth-memory"} aria-label="View source: Chipstrat" title="Source: Chipstrat"><img src={"/articles/why-do-we-need-so-much-memory-anyway/image2.png"} width={1400} height={715} alt={"Hardware compute grows 60,000-fold over 20 years, versus 100-fold for DRAM bandwidth and 30-fold for interconnect bandwidth."} loading="lazy" decoding="async" /></a>
            </figure>
            <p>{"AI inference requires a model’s learned parameters, called its weights, to be available in memory so that a processor can read them and perform the calculations needed to produce an answer. "}</p>
            <p>{"Take an example: a simple 70 Billion parameter model like Llama 3.1 70B stored at 2 bytes per parameter, meaning weights occupy ~140GB. The real storage bandwidth required in AI inference workflows is usually much higher than this number, as factors like KV cache growth, including the cached states for generated reasoning tokens outweigh the software tricks involved in decreasing the model storage burden through quantizing models, parallel runs, not loading the entire model through architectures like MoE."}</p>
            <p>{"The problem is therefore not just finding somewhere to store 140 GB, but moving the necessary portions of it into the processor quickly enough to keep the computation running."}</p>
            <h2>{"Computer memory architecture"}</h2>
            <p>{"In a data-center rack, servers combine CPUs, GPUs or other accelerators, working memory, and long-term storage. The CPU coordinates general-purpose work, while the accelerator performs the large parallel calculations used by the model. NAND flash, usually inside SSDs, holds persistent files, including model checkpoints, while RAM holds the information the system needs to access repeatedly during execution. These components are connected, but they are not all equally close to the processor or equally fast to access."}</p>
            <figure>
            <a href={"https://www.linkedin.com/pulse/hbm-illusion-why-72-gpu-rack-does-have-20tb-memory-pool-venugopal-bqhnc"}><img src={"/articles/why-do-we-need-so-much-memory-anyway/image3.png"} width={1279} height={720} alt={"Two GPU dies and adjacent HBM stacks share a unified memory pool through a high-speed interconnect on an interposer."} loading="lazy" decoding="async" /></a>
            </figure>
            <p>{"In a typical GPU-based AI server, the CPU has access to DDR memory installed on the motherboard, while the GPU has its own HBM beside the GPU’s compute die within the same "}{"package, allowing them to communicate quickly. This is not as fast as SRAM which is on the die, but the best tradeoff of speed and bandwidth."}</p>
            <figure>
            <a href={"https://newsletter.semianalysis.com/p/scaling-the-memory-wall-the-rise-and-roadmap-of-hbm"} aria-label="View source: SemiAnalysis" title="Source: SemiAnalysis"><img src={"/articles/why-do-we-need-so-much-memory-anyway/image4.png"} width={1456} height={630} alt={"Memory comparison: DDR5, LPDDR5, GDDR6X and HBM3 data rates, bus widths and bandwidths. HBM3 reaches 819.2 GB/s with a 1,024-bit bus."} loading="lazy" decoding="async" /></a>
            </figure>
            <p>{"DDR memory is generally farther away, connected through the motherboard rather than the GPU’s package. That arrangement makes it practical to install substantial capacity without surrounding the accelerator with more HBM stacks, but accessing that capacity through the CPU and its connections is not equivalent to accessing the GPU’s local memory. The tradeoff is generally more accessible capacity at lower cost, with less bandwidth."}</p>
            <figure>
            <a href={"https://www.wevolver.com/article/what-is-hbm-high-bandwidth-memory-deep-dive-into-architecture-packaging-and-applications"}><img src={"/articles/why-do-we-need-so-much-memory-anyway/image5.png"} width={950} height={447} alt={"Cross-section comparison of CoWoS-L, CoWoS-R and CoWoS-S packages, showing logic and HBM connected above a substrate."} loading="lazy" decoding="async" /></a>
            </figure>
            <figure>
            <a href={"https://www.wevolver.com/article/what-is-hbm-high-bandwidth-memory-deep-dive-into-architecture-packaging-and-applications"}><img src={"/articles/why-do-we-need-so-much-memory-anyway/image6.png"} width={950} height={447} alt={"Four HBM dies stacked above a controller, linked by through-silicon vias and connected to a processor through a silicon interposer."} loading="lazy" decoding="async" /></a>
            </figure>
            <h2>{"Types of memory"}</h2>
            <p>{"The types of working memory can first be understood as SRAM versus DRAM, with the different forms of DRAM then trading off bandwidth, capacity, power consumption, and price."}</p>
            <ul>
            <li><strong>{"Static Random-Access Memory (SRAM):"}</strong>{""}
            <ul>
            <li>{"Transistors used to store each bit, retaining value while powered without needing periodic refresh. It usually sits directly on the xPU die"}
            </li>
            <li>{"This RAM is fastest because of the short connections to the processor (installed on the die) with the highest bandwidth"}
            </li>
            <li>{"Tradeoff: Density, each bit occupies considerably more silicon than DRAM, so adding SRAM takes space that could otherwise hold compute or xPU infra"}
            </li>
            </ul>
            </li>
            <li><strong>{"Dynamic Random-Access Memory (DRAM):"}</strong>{""}
            <ul>
            <li>{"Uses one transistor and one capacitor per bit. The capacitor stores charge, but that charge leaks and must be periodically refreshed. This is part of why DRAM has its own size (and thus performance) wall, as the capacitors reach a physical limit of size (10 nm for 6F) after which any smaller would lead to charge leakage"}
            </li>
            <li>{"This simpler cell structure allows substantially more memory to fit into a given area than SRAM, making DRAM suitable for larger pools of working memory"}
            </li>
            </ul>
            </li>
            </ul>
            <h3 className="memory-dram-heading">{"Types of DRAM"}</h3>
            <ul>
            <li>{"Commodity DDR, or Double Data Rate: "}
            <ul>
            <li>{"Used by consumer desktops and servers, commonly installed as DIMM modules that plug into the motherboard"}
            </li>
            </ul>
            </li>
            <li>{"GDDR, or Graphics Double Data Rate: "}
            <ul>
            <li>{"Memory commonly used on graphics cards, with individual chips soldered onto the board around the GPU as VRAM"}
            </li>
            </ul>
            </li>
            <li>{"LPDDR, or Low-Power Double Data Rate: "}
            <ul>
            <li>{"Low-power DRAM used in phones and tightly integrated computers. It can sit on the board, beside the processor within its package, or in a package stacked above it"}
            </li>
            </ul>
            </li>
            <li>{"HBM, or High Bandwidth Memory: "}
            <ul>
            <li>{"Stacks several DRAM dies vertically and places those stacks beside the processor, typically connected through an interposer within the same package"}
            <ul>
            <li>{"This doesn’t work in regular DDR because of issues with heat and smaller bus widths"}
            </li>
            </ul>
            </li>
            <li>{"Its bandwidth comes from moving many bits simultaneously through a very wide interface: HBM3 uses 1,024 data connections per stack"}
            </li>
            <li>{"The advantage is substantial capacity and bandwidth close to compute, but stacking, bonding, testing, and advanced packaging make it complex and expensive to manufacture"}
            </li>
            <li>{"The bandwidth is what makes this the defacto choice for AI inference workflows "}
            </li>
            </ul>
            </li>
            </ul>
            <figure>
            <a href={"https://tspasemiconductor.substack.com/p/beyond-hbm-why-3d-stacked-sram-is"} aria-label="View source: SEMIVISION" title="Source: SEMIVISION"><img src={"/articles/why-do-we-need-so-much-memory-anyway/image7.png"} width={1175} height={702} alt={"SEMIVISION's 2026 overview groups memory into volatile DRAM and SRAM, and nonvolatile flash and other technologies, with suppliers for each."} loading="lazy" decoding="async" /></a>
            </figure>
            <p>{"HBM is “faster” than other memory choices primarily in the sense that it can deliver substantial aggregate bandwidth, not because every individual memory access necessarily takes less time. HBM3 and HBM3E provide a 1,024-bit interface per stack and HBM4 provides 2,048 bits. These wide interfaces allow many bits to move simultaneously without requiring each individual connection to operate as fast as a GDDR connection."}</p>
            <p>{"Case: a wider interface versus faster individual connections. At 9.2 gigabits per second across 1,024 data connections, an HBM3E stack provides roughly 1.18 terabytes per second. By comparison, GDDR7 operating at 32 gigabits per second across an entire 384-bit GPU memory interface provides roughly 1.54 terabytes per second. The GDDR connections individually run faster, but a processor can place several HBM stacks beside it, each contributing another wide interface."}</p>
            <p>{"The tradeoff is that HBM achieves this through a much more demanding physical arrangement. To understand why that matters, it helps to first follow what happens when the model actually runs."}</p>
            <h2>{"AI Inference"}</h2>
            <p>{"AI inference is structurally memory bound as the bandwidth available for decoding workflows is orders of magnitude less than what’s available for prefill, handled by compute. "}</p>
            <p>{"Prefill involves taking each input token and multiplying by each weight in the model (ie. across each layer in the transformer) running parallel matrix multiplication to get Q = XW^Q, K = XW^K, and V = XW^V. Careful wording here -> the parallel processing means this is uniquely suited to GPUs, rather than memory."}</p>
            <p>{"This stage describes why we need the model weights loaded in memory (the ~140GB example), however this gets larger due to the KV cache. KV cache is the saved K and V  vectors for each "}{"token at each layer of the transfer, maintaining the input context embedded into each token’s vector."}</p>
            <p>{"Decoding is the next step where an output token runs through the same transformer layers (dot product -> softmax for attention -> new context for the output vector) for the entire output. The key takeaway is that this process cannot be parallelized as it requires each token to be processed sequentially to preserve context and as a result, this process is memory-bound."}</p>
            <p>{"Borrowing an example from Wafer’s Cerebras WSE analysis, a representative workflow would involve:"}</p>
            <ol>
            <li><strong>{"Prefill:"}</strong>{" Take a 70B parameter model and a 512-token prompt. The model's ~140GB of FP16 weights are fetched and reused across all 512 tokens, producing roughly 455 FLOPs of computation per byte moved from memory. An H100 provides ~989 TFLOP/s of FP16 compute and ~3.35 TB/s of HBM bandwidth, giving it a compute-to-memory \"ridge point\" of roughly 295 FLOP/byte. Since 455 FLOP/byte exceeds 295, prefill is compute-bound: the GPU can keep its tensor cores busy doing matrix multiplication rather than waiting for memory."}
            </li>
            <li><strong>{"Decode:"}</strong>{" At batch size 1, generating a single new token requires reading approximately the same 140GB of model weights, but those weights are now multiplied against essentially one token vector rather than hundreds of prompt vectors. That produces roughly 140 GFLOPs of work from 140GB of weights, or ~1 FLOP/byte. The H100 needs ~295 FLOP/byte to fully utilize its compute, so at ~1 FLOP/byte almost all of its theoretical compute capacity is stranded waiting for memory. In the simplified example, maximum generation speed becomes approximately 3,350 GB/s ÷ 140 GB ≈ 24 tokens/second. Adding more tensor cores would barely help because the bottleneck is moving the weights, not multiplying them."}
            </li>
            </ol>
            <p>{"Cerebras actually circumvents this ridge-point issue by embedding SRAM onto the wafer with their compute rather than relying on HBM, but this is another issue I’ll come back to later."}</p>
            <figure>
            <a href={"https://blog.dailydoseofds.com/p/a-practical-deep-dive-on-llm-inference"} aria-label="View source: Daily Dose of Data Science" title="Source: Daily Dose of Data Science"><img src={"/articles/why-do-we-need-so-much-memory-anyway/image8.png"} width={1101} height={524} alt={"LLM inference pipeline: parallel prefill, sequential decode, and KV caching, FlashAttention, PagedAttention and speculative decoding optimizations."} loading="lazy" decoding="async" /></a>
            </figure>
            <figure>
            <a href={"https://www.dailydoseofds.com/llmops-crash-course-part-14/"}><img src={"/articles/why-do-we-need-so-much-memory-anyway/image9.png"} width={908} height={783} alt={"Prefill processes prompt tokens in parallel and builds a KV cache; decode reads the growing cache to generate one token at a time."} loading="lazy" decoding="async" /></a>
            </figure>
            <figure>
            <a href={"https://www.modular.com/blog/the-five-eras-of-kvcache"}><img src={"/articles/why-do-we-need-so-much-memory-anyway/image10.png"} width={1262} height={1600} alt={"An orchestrator reallocates CUDA memory from unused Mamba blocks to additional KV cache blocks using unmap, release, create and map operations."} loading="lazy" decoding="async" /></a>
            </figure>
            <h2>{"Why does generating a token require so much data movement?"}</h2>
            <p>{"For a dense model, generating the next token involves computation using the bulk of the model’s weights. “Dense” matters because unlike a MoE model, it does not select only a small subset of expert networks for each token. The exact operations vary by layer, but a useful first approximation is that each decoding step needs access to essentially the full set of large weight matrices. I’m ignoring N-gram models here for brevity reasons, but these can fall somewhere in between."}</p>
            <figure>
            <a href={"https://www.dailydoseofds.com/p/transformer-vs-mixture-of-experts-in-llms/"}><img src={"/articles/why-do-we-need-so-much-memory-anyway/image11.png"} width={1116} height={1126} alt={"Transformer and mixture-of-experts decoder blocks compared: the latter routes inputs to selected expert networks instead of a single feed-forward network."} loading="lazy" decoding="async" /></a>
            </figure>
            <p>{"For the 70B model, 2 byte per parameter model example from earlier - we don’t store another 140 GB every time it produces a token, or reloads the model from an SSD. The weights are already stored in memory. The weights remain in HBM or other accelerator memory. The issue is that they cannot fit in the processor’s much smaller on-chip SRAM (unless you’re Cerebras :o), so the model’s weights must be repeatedly streamed from HBM into the compute units during each decoding step."}</p>
            <p>{"For one request decoding on its own, with 16-bit weights, that can mean roughly 140 GB of weight traffic per generated token. The system holds the weights once but reads through them repeatedly. The calculations are compute-driven parallel multiplications and additions. A layer takes tokens, multiplies them by learned weight matrices, and passes the resulting representations onward."}</p>
            <p>{"Use the NVIDIA DGX H100. It makes the example concrete because it is an actual 8-GPU commercial system with 640 GB of HBM3. Each H100 has 80 GB of HBM3 and 3.35 TB/s of memory bandwidth, for about 26.8 TB/s of aggregate theoretical bandwidth across the eight GPUs."}</p>
            <p>{"If the goal is 700–900 generated tokens per second, each decoding step has only about 1.1–1.4 milliseconds to complete. The problem is that even a system as powerful as an NVIDIA DGX "}{"H100 cannot stream every weight of a 70B dense model from HBM quickly enough to hit that target. This is why high-speed inference requires us to jump the memory wall by reducing how much data must move per token, increasing effective bandwidth, or keeping more of the relevant model closer to compute."}</p>
            <p>{"For a dense transformer, a useful approximation for the main weight-related computation is:"}</p>
            <ul>
            <li>{"FLOPs per token ≈ 2 × number of parameters"}
            </li>
            </ul>
            <p>{"A multiplication followed by an addition counts as two floating-point operations, so a 70-billion-parameter model requires approximately:"}</p>
            <ul>
            <li>{"2 × 70 billion = 140 billion FLOPs per token"}
            </li>
            </ul>
            <p>{"That is 140 GFLOPs per token, before adding attention work and other overhead that can become important, especially at long context lengths. Now put that model on a DGX H100. At 2 bytes per parameter, the model occupies:"}</p>
            <ul>
            <li>{"70 billion parameters × 2 bytes = 140 GB"}
            </li>
            </ul>
            <p>{"The DGX H100 has eight H100 GPUs with 80 GB of HBM3 each, so there is enough aggregate capacity to hold the model. If the weights are evenly sharded across the eight GPUs, each H100 holds about:"}</p>
            <ul>
            <li>{"140 GB ÷ 8 = 17.5 GB of weights"}
            </li>
            </ul>
            <p>{"Each H100 provides 3.35 TB/s of HBM bandwidth. If all eight GPUs read their shards in parallel, the system has a theoretical aggregate bandwidth of:"}</p>
            <ul>
            <li>{"8 × 3.35 TB/s = 26.8 TB/s"}
            </li>
            </ul>
            <p>{"Reading the entire 140 GB model once therefore takes, in the ideal case:"}</p>
            <ul>
            <li>{"140 GB ÷ 26,800 GB/s = 0.0052 seconds = 5.2 milliseconds"}
            </li>
            </ul>
            <p>{"That alone creates an ideal weight-bandwidth ceiling of approximately:"}</p>
            <ul>
            <li>{"1 second ÷ 0.0052 seconds per token ≈ 191 tokens per second"}
            </li>
            </ul>
            <p>{"A dense H100 has roughly 1 PFLOP/s of BF16 Tensor Core throughput, or roughly 8 PFLOP/s across the eight GPUs. So the 140 billion FLOPs would theoretically require only around:"}</p>
            <ul>
            <li>{"140 billion FLOPs ÷ 8 quadrillion FLOPs/s ≈ 0.018 milliseconds"}
            </li>
            </ul>
            <p>{"These are idealized bounds, not an actual benchmark. As I mentioned earlier real inference also has attention and KV cache processing times in addition to dozens and dozens of software tricks to make this more efficient, but the comparison makes the memory wall clear. The matrix multiplication might theoretically take around 0.018 ms, while simply reading the weights from HBM takes around 5.2 ms."}</p>
            <p>{"Now compare that with the 700–900 token-per-second target:"}</p>
            <ul>
            <li>{"700 tokens/s = about 1.43 ms per token"}
            </li>
            <li>{"900 tokens/s = about 1.11 ms per token"}
            </li>
            </ul>
            <p>{"If we still had to stream all 140 GB of weights for every token, the required aggregate memory bandwidth would be:"}</p>
            <ul>
            <li>{"140 GB ÷ 0.00143 seconds ≈ 98 TB/s for 700 tokens/s"}
            </li>
            <li>{"140 GB ÷ 0.00111 seconds ≈ 126 TB/s for 900 tokens/s"}
            </li>
            </ul>
            <p>{"A DGX H100 has only about 26.8 TB/s of theoretical aggregate HBM bandwidth. So brute-force dense decoding at 2 bytes per parameter would require roughly 3.7–4.7× more memory bandwidth just to hit 700–900 tokens per second, before accounting for any other work."}</p>
            <p>{"This is why fast inference systems cannot simply take a conventional dense model and run every parameter through HBM for every token. They need tricks that reduce the amount of data moved per token or radically change where that data lives. "}</p>
            <p>{"This is the memory wall in a concrete workload. The qualification is that the same weight read can support more work when multiple requests are batched together, and prefill also offers substantial reuse. The bottleneck therefore depends on how the model is being served, not simply on whether the application uses AI."}</p>
            <p>{"Video: "}<a href={"https://youtu.be/ENkuf_2zbkc?si=dWvxFoj50W3exH0a"}>{"The Engineering Behind LLM Inference: The Memory Wall"}</a></p>
            <iframe className="memory-video" src="https://www.youtube-nocookie.com/embed/ENkuf_2zbkc" title="The Engineering Behind LLM Inference: The Memory Wall" width="680" height="383" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
            <h2>{"Why can’t we just use more HBM?"}</h2>
            <p>{"Based on this, the central issue arises: if HBM provides so much bandwidth, why can’t we simply add more of it until the processor has everything it needs?"}</p>
            <p>{"Before I can get that, I want to explain how HBM is actually built, and then explain the bottlenecks."}</p>
            <p>{"HBM begins with DRAM dies fabricated on silicon wafers. Each die contains large numbers of memory cells with rows and columns of capacitors. Density is described with half-pitch, meaning half the spacing between repeated features in the memory array. We are currently at 1c produced by SK Hynix making up 34% of DRAM production."}</p>
            <figure>
            <a href={"https://www.chiplog.io/p/fundamental-guide-to-understanding"}><img src={"/articles/why-do-we-need-so-much-memory-anyway/image12.png"} width={928} height={1328} alt={"A DRAM read address is divided into rank, row, bank and column fields; row and column decoders select data through sense amplifiers."} loading="lazy" decoding="async" /></a>
            </figure>
            <figure className="memory-figure-narrow">
            <a href={"https://www.chiplog.io/p/fundamental-guide-to-understanding"}><img src={"/articles/why-do-we-need-so-much-memory-anyway/image13.png"} width={1456} height={971} alt={"HBM package cross-section highlights thermal challenges, signal integrity, power consumption, and yield and packaging constraints."} loading="lazy" decoding="async" /></a>
            </figure>
            <figure>
            <a href={"https://www.chinatalk.media/p/will-china-hit-the-hbm-wall"} aria-label="View source: ChinaTalk" title="Source: ChinaTalk"><img src={"/articles/why-do-we-need-so-much-memory-anyway/image14.png"} width={423} height={119} alt={"DRAM manufacturing node progression for SK hynix, Samsung, Micron and CXMT from 2017 through 2025."} loading="lazy" decoding="async" /></a>
            </figure>
            <p>{"After fabrication and testing, the dies are thinned so that several can fit within a tightly controlled stack height. "}<a href={"https://www.viksnewsletter.com/p/why-is-hbm-so-hard-to-manufacture"}>{"Vikram Sekar"}</a>{"’s manufacturing walkthrough describes DRAM die thicknesses of roughly 30–50 micrometers and stacks of 4, 8, or 12.  Those vertical connections are through-silicon vias, or TSVs. They carry signals through the dies, while bonding connections join the individual layers. A base die provides the interface between the memory stack and the rest of the system, allowing the assembled stack to communicate with the nearby processor. Adding more layers therefore requires more than making the stack taller. "}</p>
            <p>{"SK Hynix’s 12-hi HBM3E used DRAM chips that were 40% thinner than those in its eight-layer product, allowing twelve layers to fit within the same total height. This explains why HBM is difficult to scale even when demand is obvious. "}</p>
            <p>{"To summarize, the issues with scaling HBM are threefold."}</p>
            <h3>{"1. It is hard to manufacture"}</h3>
            <ul>
            <li>{"HBM architecture requires specialized equipment beyond ordinary DRAM production. For scale, SK hynix’s June 2026 order for Hanmi’s TC Bonder 4.5 Griffin equipment totaled $28.7 million for an estimated 15 machines, roughly $2 million each. There are further costs in TSV formation, wafer thinning, and inspection that require additional equipment"}
            </li>
            <li>{"China’s CXMT illustrates how difficult this is to replicate. In June 2026, SemiAnalysis estimated its eight-layer HBM3 production had 35% front-end yield and 70% back-end yield, implying approximately 25% combined yield across fabrication and packaging"}
            </li>
            <li>{"In August 2026, Micron reiterated that producing 100 bits of HBM3E displaces approximately 300 bits of conventional DDR output, with that tradeoff expected to approach 4:1 for HBM4E"}
            </li>
            </ul>
            <h3>{"2. Chip real estate is limited"}</h3>
            <ul>
            <li>{"HBM usually sits beside the accelerator on an interposer or comparable advanced package, whereas GDDR sits in separate packages on the surrounding circuit board. HBM’s short, wide connections enable high bandwidth, but consume package space from the processor. HBM4 doubles the data interface from 1,024 to 2,048 bits per stack, meaning even more connections must fit between memory and compute."}
            </li>
            <li>{"This creates the shoreline problem: there is limited usable perimeter and interface area around the processor. Adding another stack can require redesigning the accelerator package (sometimes fixed by building up, but according to "}<a href={"https://newsletter.semianalysis.com/p/long-live-the-short-king-why-4-hi"}>{"this"}</a>{" smaller stacks are actually the way to go)"}
            </li>
            <li>{"Micron’s 48GB, 16-layer HBM4 samples provide 33% more capacity per placement than its 36GB, 12-layer parts, but both use the same 2,048-bit interface. More layers do not create another independent connection to the processor"}
            </li>
            </ul>
            <h3>{"3. It is expensive"}</h3>
            <ul>
            <li>{"The manufacturing and packaging requirements compound. The customer is paying for the memory dies, the processes that turn them into a working stack, and the package that connects those stacks to compute. Difficult assembly and testing also mean that adding nominal capacity is not the same as producing an equivalent amount of usable, qualified memory."}
            </li>
            <li>{"For a dollar example, July 2026 reporting put HBM3E at $1.50–$1.60 per gigabit, or $12–$12.80 per GB. At those reported prices, 192 GB would cost roughly $2,300–$2,460 for the memory alone, before the accelerator package, compute dies, and the "}{"rest of the server. These are reported component prices, not a public NVIDIA bill of materials or a complete-system quote."}
            </li>
            <li>{"In December 2025, TrendForce reported that HBM3E had previously cost 4–5× as much as server DDR5, but forecast that the gap would narrow to 1–2× by the end of 2026 as DDR5 prices rose. More expensive memory also does not automatically mean a higher cost per token: an HBM system can cost more upfront but less per token if its additional throughput offsets that cost. The relevant comparison is total system cost relative to delivered performance, not memory price alone."}
            </li>
            <li>{"The result is that “add more HBM” is simultaneously a memory-supply problem, a processor-design problem, and a packaging problem."}
            </li>
            </ul>
            <figure>
            <a href={"https://www.trendforce.com/research/download/RP251117MU"}><img src={"/articles/why-do-we-need-so-much-memory-anyway/image15.png"} width={960} height={720} alt={"TrendForce chart compares average selling price per wafer for HBM4, HBM3e, DDR5 RDIMM and DDR5 SODIMM from 2025 through 2026 forecasts."} loading="lazy" decoding="async" /></a>
            </figure>
            <h2>{"Tricks to jump the memory wall"}</h2>
            <p>{"All this explains why we have a memory wall in the first place, so the question arises of how companies are circumventing this bottleneck to provide 700-900+ token/second inference anyway."}</p>
            <figure>
            <img src={"/articles/why-do-we-need-so-much-memory-anyway/image16.png"} width={2048} height={1536} alt={"Four approaches to the memory wall mapped to companies: parallel memory, weights in SRAM, tiered memory and software, across training, inference and capacity needs."} loading="lazy" decoding="async" />
            </figure>
            <h3>{"Trick 1: More non-HBM memory in parallel"}</h3>
            <p>{"The first trick is to use memory with less bandwidth per device or channel, but provide enough independent channels for the system to move substantial amounts of data in parallel. This tackles the HBM scaling issue by using combinations of other memory architectures while getting similar bandwidth and speed."}</p>
            <ul>
            <li><a href={"https://majestic-labs.ai/"}>{"Majestic Labs"}</a>{" tackles the slow memory problem by moving huge amounts of RAM off-package (8–128 TB) into shared memory pools. They target speed and bandwidth comparable to HBM with custom memory-interface chiplets. Even though each piece of LPDDR supplies less bandwidth, they use massive parallelism to get large total bandwidth. This lets them add memory without buying proportional amounts of compute just to get its attached RAM"}
            </li>
            <li><a href={"https://www.positron.ai/"}>{"Positron"}</a>{" also uses LPDDR5X, but puts it on-package with its inference ASICs and extends capacity with off-package memory connected through CXL. This gives an accelerator more room for model weights and context, reducing the need to split workloads across chips just to find enough RAM.  This video is helpful in understanding why they choose LPDDR over other options: "}<a href={"https://www.youtube.com/watch?v=B8O3pLcX2w4"}>{"Why Positron AI is Choosing LPDDR over HBM for Next-Gen LLM | Researcher Conversations at GTC"}</a>
            <iframe className="memory-video" src="https://www.youtube-nocookie.com/embed/B8O3pLcX2w4" title="Why Positron AI is Choosing LPDDR over HBM for Next-Gen LLM | Researcher Conversations at GTC" width="680" height="383" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
            </li>
            <li><a href={"https://hyperaccel.ai/"}>{"HyperAccel"}</a>{" compensates for LPDDR5X’s lower bandwidth by reusing fetched weights across multiple requests rather than fetching them separately for each one. This is similar to batching while I’ll cover below, but also allows for parallel memory channels to bring the data into on-chip SRAM, while separate compute lanes apply those weights to different requests to get the benefits of parallel processing and circumvent the associated memory bottleneck"}
            </li>
            <li><a href={"https://tenstorrent.com/en"}>{"Tenstorrent"}</a>{" gets more work out of GDDR6 by giving its compute cores local SRAM, where intermediate results can stay between calculations instead of going back to external memory after every operation. They also connect accelerators through Ethernet, allowing larger workloads to run across processors reading from their own GDDR6 in parallel. This increases total bandwidth by adding independent memory connections, while local SRAM reduces how much traffic those connections need to carry"}
            </li>
            </ul>
            <h3>{"Trick 2: Keep the weights stationary in SRAM"}</h3>
            <p>{"The second trick is to keep weights in SRAM beside the compute, rather than repeatedly streaming them from external DRAM for every token. The weights still need to be read, but those reads happen locally, while token representations and intermediate results move between processors. The tradeoff is capacity because the new challenge becomes fitting enough SRAM on your dies."}</p>
            <ul>
            <li><a href={"https://www.cerebras.ai/"}>{"Cerebras"}</a>{" avoids repeated HBM transfers by keeping weights in SRAM and making the processor wafer-sized so there is room for much more of it. Its 44 GB SRAM design puts that memory directly beside compute rather than in separate DRAM stacks. The weights are still read for every token but it is local through the on-die SRAM instead of crossing an external memory interface on the motherboard"}
            </li>
            <li><a href={"https://matx.com/"}>{"MatX"}</a>{" separates repeated weight reads from growing context by typically keeping weights in SRAM and the KV cache in HBM. The weights remain fixed during inference, while the KV cache grows with the conversation, so putting both in SRAM would make long contexts particularly expensive"}
            </li>
            <li><a href={"https://olix.com/"}>{"OLIX"}</a>{" tackles the communication problem created by distributing weights across SRAM-based chips by connecting those chips through optical links. Keeping a large model in SRAM requires substantial silicon, so the connections between processors become part of the cost and delay of generating each token. Optical links move results between processing stages with the aim of increasing communication bandwidth without proportionally increasing power consumption. The point is to add more SRAM-bearing processors without their connections becoming the next bottleneck"}
            </li>
            </ul>
            <h3>{"Trick 3: Only put the hot thing in expensive memory"}</h3>
            <p>{"The third trick is to separate data that is needed immediately and repeatedly from data that mainly needs to remain available. This means combining memory tiers like SRAM, HBM, and DDR, keeping the active working set in faster memory and additional model data in a larger, cheaper tier. The point is to add capacity without putting everything in expensive memory. This only works well if the system can move the required data into the fast tier before compute needs it."}</p>
            <ul>
            <li><a href={"https://www.d-matrix.ai/"}>{"d-Matrix"}</a>{" reduces weight movement by building digital arithmetic into SRAM-based memory blocks, then adds off-chip LPDDR5 for capacity. Active weights can stay in SRAM during fast decoding, while inactive KV cache and saved prompt prefixes sit in the larger LPDDR tier. This leaves expensive SRAM holding the data needed for current calculations rather than context that is only being retained for a later request. Larger workloads can also use the external tier, but they do not get the same bandwidth as data already resident in SRAM. The Positron video is also helpful here"}
            </li>
            <li><a href={"https://sambanova.ai/"}>{"SambaNova"}</a>{" keeps additional models in cheaper DDR and moves the active model into HBM, rather than trying to keep every model in the fastest memory at once. The DDR connects directly into the accelerator’s memory hierarchy, avoiding the conventional path of loading a model from CPU memory over PCIe whenever it is needed. SRAM then holds data for local calculations. This lets an enterprise keep several specialist models available on shared infrastructure without dedicating separate accelerator capacity to each one"}
            </li>
            <li><a href={"https://www.etched.com/"}>{"Etched"}</a>{" tackles cross-chip memory delays by combining HBM and SRAM in a shared memory pool connected through a custom low-latency interconnect. Instead of only increasing bandwidth inside each processor, they also work on how quickly a processor can access data elsewhere in the cluster. This is how they aim to retain HBM’s capacity while approaching SRAM-like decoding speed, rather than adding enough SRAM-only processors to hold the entire workload"}
            </li>
            </ul>
            <h3>{"Trick 4: Software"}</h3>
            <p>{"The fourth trick is to reduce how much data needs to be stored or moved in the first place. "}</p>
            <p>{"Some general tools are:"}</p>
            <ul>
            <li><a href={"https://www.radixark.com/"}>{"RadixArk"}</a>{" and similar SGLang based solutions consolidate KV cache by reusing matching prompt trajectories. Requests starting with the same document or instructions can share the saved context, so the system does not need to compute and store it separately for each request"}
            </li>
            <li><a href={"https://vllm.ai/"}>{"vLLM"}</a>{" reduces wasted memory by allocating KV cache in blocks as requests grow. This avoids reserving more space than a request actually uses, leaving room for more requests on the same GPU"}
            </li>
            <li><a href={"https://arxiv.org/abs/2601.07372"}>{"MoE and N-gram models"}</a>{" reduce how much work happens per token. MoE only activates selected experts, while N-gram lookup modules like Engram retrieve stored representations instead of repeatedly reconstructing common patterns. The parameters still need to be stored, but less computation is needed to use them"}
            </li>
            <li><a href={"https://arxiv.org/abs/2305.14314"}>{"Quantization"}</a>{" reduces the bits used to represent each weight. The example of the 70B model falls from roughly 140 GB at 16 bits to 35 GB at four bits before metadata, so there is less data to store and move, assuming sufficient accuracy is preserved"}
            </li>
            <li><a href={"https://arxiv.org/abs/2503.05248"}>{"Batching"}</a>{" uses the same fetched weights across several requests. Each memory transfer supports more calculations, increasing total throughput, although this does not necessarily make one user’s answer arrive faster"}
            </li>
            </ul>
            <h2>{"Where to invest"}</h2>
            <h3>{"1. Continued importance of speed for datacenter inference"}</h3>
            <p>{"Speed will continue to be important for broad SDLC adoption, where agents repeatedly generate code, call tools, and revise their work. Each step adds waiting time, which also matters for applications like voice, interactive video, and world models."}</p>
            <ol>
            <li>{"Cerebras tackles this by keeping weights in SRAM across wafer-scale processors. The weights stay beside compute rather than repeatedly moving from HBM, letting coding and agent providers generate answers faster through its inference service"}
            </li>
            <li>{"d-Matrix can accelerate inference without replacing the existing GPU infrastructure. Its SRAM-based cards can generate speculative tokens while GPUs verify them together, so the larger model does not need a separate decoding pass for every accepted token"}
            </li>
            </ol>
            <p>{"The decision between them is whether the customer moves a supported model onto Cerebras or adds specialized hardware alongside its GPUs. The latter preserves existing infrastructure but requires coordinating both processors."}</p>
            <h3>{"2. More memory capacity for more context"}</h3>
            <p>{"Assuming model sizes eventually plateau or shrink, more capacity can be dedicated to context rather than weights. Qwen3-Coder-Next provides one example at 80B total parameters, compared with the earlier Qwen3-Coder’s 480B, although one smaller release does not establish an industry-wide trend."}</p>
            <p>{"The model architecture matters here. Original Mistral 7B uses a 4,096-token sliding window per layer, whereas Llama 3.1 supports full attention over 128K context. The latter retains much more KV data, so parameter count alone does not tell us how much memory is needed."}</p>
            <ol>
            <li>{"SambaNova adds capacity through DDR while keeping active data in HBM and SRAM. This lets enterprises hold more models on shared infrastructure, but the context thesis still depends on accessing the required KV data quickly enough, not just finding somewhere to store it"}
            </li>
            <li>{"The concern is whether this becomes a sustainable business. Its announced first close of a $1B financing round improves funding access, but does not establish margins or how long the cash will last"}
            </li>
            </ol>
            <h3>{"3. Physical AI and edge applications"}</h3>
            <ol>
            <li>{"Etched worked with Decart on Oasis, a world model which generates the next frame from previous frames and user actions at 20 frames per second, could potentially be used similar to General Intuition models for visual reasoning in physical AI"}
            </li>
            <li>{"Cerebras also has the Reachy Mini voice integration with Hugging Face. I find Oasis more relevant to the world-model application, but that has the transformer-only concern."}
            </li>
            <li>{"SiMa.ai brings more processing onto the device by combining CPU cores, vision processing, and AI compute on one chip. Camera inputs can be processed locally, so manufacturers do not need a separate cloud call for every inference"}
            </li>
            <li>{"Axelera AI performs matrix calculations inside SRAM-based compute blocks. This reduces the energy spent moving weights, making continuous inference more practical for cameras and industrial devices with limited power"}
            </li>
            </ol>
            <p>{"The decision here is whether more capable models continue moving on-device, as demonstrated by Gemini Robotics On-Device, or remain cloud-based. This doesn’t account for cases where connectivity is unavailable such as robotics for dangerous contexts ("}<a href={"https://www.anybotics.com/"}>{"ANYbotics"}</a>{"). For regular deployments, the question is whether local models become capable enough that avoiding network delays and recurring cloud costs outweighs access to a larger remote model."}</p>
          </div>
        </article>
      </main>
    </>
  )
}
