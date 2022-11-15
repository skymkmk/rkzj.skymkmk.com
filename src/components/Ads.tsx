import { useEffect } from "react";

const Ads = () => {
    const adsbygoogle = (window as any).adsbygoogle || [];
    useEffect(() => {
        try {
            adsbygoogle.push({});
        }
        catch (e) {}
    }, []);
    return <ins className="adsbygoogle" style={{ display: "block", textAlign: "center" }} data-ad-layout="in-article" data-ad-format="fluid" data-ad-client="ca-pub-9917610262791684" data-ad-slot="7605007407"></ins>;
}

export default Ads;