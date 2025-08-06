import { renderHook } from '@testing-library/react'
import { useModels } from '../useModels'

// Mock Supabase client
jest.mock('@/utils/supabase/client', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({
            data: {
              id: 'test-id',
              name: 'Test Model',
              description: 'Test Description',
              price: 100000,
              specifications: {
                range: '100km',
                top_speed: '60km/h',
                charging_time: '4 hours',
                battery: '48V 20Ah',
                weight: '60kg',
                motor_power: '1000W',
                features: ['Feature 1', 'Feature 2'],
                colors: ['Red', 'Blue']
              },
              main_image: '/test.jpg',
              gallery: ['/test1.jpg', '/test2.jpg'],
              created_at: '2024-01-01',
              updated_at: '2024-01-01'
            },
            error: null
          }))
        })),
        order: jest.fn(() => Promise.resolve({
          data: [],
          error: null
        }))
      }))
    }))
  }))
}))

describe('useModels hook', () => {
  it('should maintain getModelById reference equality across renders', () => {
    const { result, rerender } = renderHook(() => useModels())
    
    // Get initial reference to getModelById
    const firstRender = result.current.getModelById
    
    // Force a re-render
    rerender()
    
    // Get reference after re-render
    const secondRender = result.current.getModelById
    
    // Verify that the function reference remains the same
    expect(firstRender).toBe(secondRender)
  })
  
  it('should not recreate getModelById when other state changes', async () => {
    const { result, rerender, waitForNextUpdate } = renderHook(() => useModels())
    
    // Get initial reference
    const initialGetModelById = result.current.getModelById
    
    // Wait for initial fetch to complete (which updates loading state)
    await waitForNextUpdate()
    
    // Get reference after state update
    const afterStateUpdate = result.current.getModelById
    
    // Verify reference stability
    expect(initialGetModelById).toBe(afterStateUpdate)
  })
})
