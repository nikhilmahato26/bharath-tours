'use client'
import { useState, useEffect } from 'react'

const DEFAULTS = { phone: '919429420178' } 
let _cache = null
let _fetchPromise = null

function loadSettings() {
  if (_fetchPromise) return _fetchPromise
  _fetchPromise = fetch('/api/settings')
    .then(r => r.ok ? r.json() : DEFAULTS)
    .then(data => { _cache = { ...DEFAULTS, ...data }; return _cache })
    .catch(() => { _cache = DEFAULTS; return DEFAULTS })
  return _fetchPromise
}

export function invalidateSettingsCache() {
  _cache = null
  _fetchPromise = null
}

export function useSettings() {
  const [settings, setSettings] = useState(() => _cache || DEFAULTS)
  useEffect(() => {
    if (_cache) return
    loadSettings().then(setSettings)
  }, [])
  return settings
}

export function usePhone() {
  return useSettings().phone || DEFAULTS.phone
}

export function useWhatsapp() {
  const s = useSettings()
  return s.whatsapp || s.phone || DEFAULTS.phone
}

export function useEmail() {
  return useSettings().email || ''
}

export function useEmail2() {
  return useSettings().email2 || ''
}
