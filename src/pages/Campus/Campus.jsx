import { useState, useEffect, useRef } from 'react';
import { Compass } from 'lucide-react';
import './Campus.css';

export default function Campus() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const mapContainerRef = useRef(null);

  // Function to constrain panning offsets within container boundaries
  const getClampedOffset = (x, y, zoom) => {
    if (!mapContainerRef.current) return { x, y };
    const rect = mapContainerRef.current.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;

    const canvasW = 1000 * zoom;
    const canvasH = 625 * zoom;

    let clampedX = x;
    let clampedY = y;

    // X axis bounds: Panning is only allowed if canvas width is wider than container width
    if (canvasW > W) {
      clampedX = Math.min(Math.max(x, W - canvasW), 0);
    } else {
      clampedX = (W - canvasW) / 2;
    }

    // Y axis bounds: Panning is only allowed if canvas height is taller than container height
    if (canvasH > H) {
      clampedY = Math.min(Math.max(y, H - canvasH), 0);
    } else {
      clampedY = (H - canvasH) / 2;
    }

    return { x: clampedX, y: clampedY };
  };

  // 1. Initial fit zoom on mount and window resize/orientation changes
  useEffect(() => {
    const handleResize = () => {
      if (mapContainerRef.current) {
        const rect = mapContainerRef.current.getBoundingClientRect();
        const zoomX = rect.width / 1000;
        const zoomY = rect.height / 625;
        const fitZoom = Math.min(zoomX, zoomY);
        
        setZoomLevel(fitZoom);
        setPanOffset({
          x: (rect.width - 1000 * fitZoom) / 2,
          y: (rect.height - 625 * fitZoom) / 2
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. Clamp offsets when zoom level changes (due to user zoom buttons)
  useEffect(() => {
    setPanOffset(prev => getClampedOffset(prev.x, prev.y, zoomLevel));
  }, [zoomLevel]);

  // Zoom controls
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.2));
  const handleZoomReset = () => {
    if (mapContainerRef.current) {
      const rect = mapContainerRef.current.getBoundingClientRect();
      const zoomX = rect.width / 1000;
      const zoomY = rect.height / 625;
      const fitZoom = Math.min(zoomX, zoomY);
      
      setZoomLevel(fitZoom);
      setPanOffset({
        x: (rect.width - 1000 * fitZoom) / 2,
        y: (rect.height - 625 * fitZoom) / 2
      });
    } else {
      setZoomLevel(1);
      setPanOffset({ x: 0, y: 0 });
    }
  };

  // Drag Panning Handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Left click only
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const targetX = e.clientX - dragStart.x;
    const targetY = e.clientY - dragStart.y;
    setPanOffset(getClampedOffset(targetX, targetY, zoomLevel));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Support for mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - panOffset.x,
        y: e.touches[0].clientY - panOffset.y
      });
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const targetX = e.touches[0].clientX - dragStart.x;
    const targetY = e.touches[0].clientY - dragStart.y;
    setPanOffset(getClampedOffset(targetX, targetY, zoomLevel));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="campus-page">
      <div className="campus-container">
        {/* Page Header */}
        <div className="campus-header">
          <div className="campus-title-wrap">
            <Compass className="campus-compass-icon animate-spin-slow" size={32} />
            <h1>TIET Campus Map</h1>
          </div>
          <p>Explore the official landscape brochure map of the Thapar Institute of Engineering and Technology. Use the controls to zoom and navigate the map.</p>
        </div>

        {/* Map Viewer Canvas Card */}
        <div className="campus-map-card glass-panel full-width" ref={mapContainerRef}>
          <div className="map-view-controls">
            <button onClick={handleZoomIn} title="Zoom In">+</button>
            <button onClick={handleZoomOut} title="Zoom Out">-</button>
            <button onClick={handleZoomReset} title="Reset Zoom">Reset</button>
            <span className="zoom-indicator">{Math.round(zoomLevel * 100)}%</span>
          </div>

          <div 
            className="map-canvas-container"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="map-canvas" 
              style={{ 
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`
              }}
            >
              {/* ─── Landscape Viewport Map SVG ─── */}
              <svg className="map-blueprint-svg" viewBox="0 0 100 62.5">
                {/* Rotated Static Map Image Layer */}
                <image href="/campus_map_rotated.png" x="0" y="0" width="100" height="62.5" preserveAspectRatio="none" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
