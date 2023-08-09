import { NextResponse } from "next/server";

export async function POST(request) {
    let data = await request.json()
    const {imageurl, emoji, hashtag, captions} = data
    let includeEmojis =  emoji  === 'true' ? '&useEmojis=true': '';
    let includeHashtags = hashtag === 'true' ? '&useHashtags=true' : '';
    const url = `https://image-caption-generator2.p.rapidapi.com/v2/captions?imageUrl=${imageurl}${includeEmojis+includeHashtags}&limit=${captions}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b7a19997eemsh935ad0881fafed8p14a019jsn6a0880a9fa8e',
            'X-RapidAPI-Host': 'image-caption-generator2.p.rapidapi.com'
        }
    };
    
  try {
    const response = await fetch(url, options);
    let data = await response.json();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "error" }, { status: 200 });
  }
}
