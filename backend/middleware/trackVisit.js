import Visit from '../models/Visit.js';
import useragent from 'express-useragent';

export const trackVisit = async (req, res, next) => {
  try {
    // 1. Parse the incoming request source
    const source = req.headers['user-agent'];
    const ua = useragent.parse(source);

    // --- UPDATED DEBUG LOGS ---
    if (req.originalUrl.includes("myphone")) {
        console.log("📱 >>> PHONE DETECTED HERE <<<");
        console.log("URL:", req.originalUrl);
        console.log("Source UA:", source);
        console.log("Is Mobile?", ua.isMobile);
        console.log("--------------------------------");
    }
    // --------------------------

    // 2. Identify the visitor
    // Note: IP extraction depends on if you are behind a proxy (like Render)
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Improve the classification logic
    let finalDeviceType = 'Desktop';
    if (ua.isMobile) finalDeviceType = 'Mobile';
    if (ua.isTablet) finalDeviceType = 'Tablet'; // Catch tablets specifically

    // 3. Save to DB
    // We strictly await this so we don't lose data, but in high-scale apps
    // you might fire-and-forget to keep things fast.
    await Visit.create({
      ip: ip,
      browser: ua.browser,
      os: ua.os,
      deviceType: finalDeviceType,
    });

  } catch (error) {
    console.error("Tracking Error:", error);
    // Don't crash the app if tracking fails, just move on
  }
  
  next(); // Always let them pass!
};