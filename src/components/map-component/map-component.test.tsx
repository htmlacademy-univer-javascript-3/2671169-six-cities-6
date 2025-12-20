import { render, screen, waitFor } from '@testing-library/react';
import MapComponent from './map-component';
import { City, PointI } from '../../types/offer';
import { Marker } from 'leaflet';

export const mockMap = {
  setView: vi.fn(),
  removeLayer: vi.fn()
};

vi.mock('../../hooks/use-map', () => ({
  default: vi.fn(() => mockMap)
}));

vi.mock('leaflet', () => ({
  Marker: vi.fn(() => ({
    setIcon: vi.fn().mockReturnThis(),
    addTo: vi.fn()
  })),
  layerGroup: vi.fn(() => ({
    addTo: vi.fn().mockReturnThis()
  })),
  Icon: vi.fn()
}));

describe('Component: MapComponent', () => {
  const city: City = {
    name: 'Paris',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 10
    }
  };

  const points: PointI[] = [
    { latitude: 48.85, longitude: 2.35, zoom: 10 },
    { latitude: 48.86, longitude: 2.36, zoom: 10 }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    render(
      <MapComponent
        city={city}
        points={[]}
        selectedPoint={undefined}
      />
    );

    expect(screen.getByTestId('map-section')).toBeInTheDocument();
  });

  it('should set center of the map when user change city', async () => {
    render(
      <MapComponent
        city={city}
        points={[]}
        selectedPoint={undefined}
      />
    );

    await waitFor(() => {
      expect(mockMap.setView).toHaveBeenCalledWith(
        {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        city.location.zoom
      );
    });
  });

  it('should create markers for all points', async () => {
    render(
      <MapComponent
        city={city}
        points={points}
        selectedPoint={undefined}
      />
    );

    await waitFor(() => {
      expect(Marker).toHaveBeenCalledTimes(points.length);
    });
  });

  it('should call removeLayer when rerendered', async () => {
    const { rerender } = render(
      <MapComponent
        city={city}
        points={points}
        selectedPoint={undefined}
      />
    );

    rerender(
      <MapComponent
        city={city}
        points={[points[0]]}
        selectedPoint={undefined}
      />
    );

    await waitFor(() => {
      expect(mockMap.removeLayer).toHaveBeenCalledTimes(1);
    });
  });
});
