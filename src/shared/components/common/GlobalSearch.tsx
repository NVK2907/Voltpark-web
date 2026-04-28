import { Search, Loader2, MapPin, Zap, User, Clock, X } from 'lucide-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/lib/constants';
import { MOCK_STATIONS, MOCK_CHARGERS, MOCK_USERS } from '@/lib/mock-data';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/shared/components/ui/command';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useGlobalSearch } from '@/shared/hooks/useGlobalSearch';

export function GlobalSearch() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    isOpen,
    setIsOpen,
    query,
    setQuery,
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
  } = useGlobalSearch();
  const debouncedQuery = useDebounce(query, 300);
  const [isSearching, setIsSearching] = React.useState(false);

  // Mock search results
  const stations = React.useMemo(
    () =>
      MOCK_STATIONS.filter(
        (s) =>
          s.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          s.id.toLowerCase().includes(debouncedQuery.toLowerCase()),
      ).slice(0, 3),
    [debouncedQuery],
  );

  const chargers = React.useMemo(
    () =>
      MOCK_CHARGERS.filter((c) => c.id.toLowerCase().includes(debouncedQuery.toLowerCase())).slice(
        0,
        3,
      ),
    [debouncedQuery],
  );

  const users = React.useMemo(
    () =>
      MOCK_USERS.filter(
        (u) =>
          u.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          u.email.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          u.phone.includes(debouncedQuery),
      ).slice(0, 3),
    [debouncedQuery],
  );

  React.useEffect(() => {
    if (query !== debouncedQuery) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [query, debouncedQuery]);

  const handleSelect = (value: string, href: string) => {
    addRecentSearch(value);
    setIsOpen(false);
    navigate(href);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-full max-w-[240px] items-center gap-2 rounded-md border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted"
      >
        <Search className="h-4 w-4" />
        <span className="hidden flex-1 text-left lg:inline-flex">Tìm kiếm...</span>
        <kbd className="hidden h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 lg:inline-flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          placeholder="Tìm kiếm trạm, bộ sạc, người dùng..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {isSearching && (
            <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang tìm kiếm...
            </div>
          )}
          {!isSearching && debouncedQuery.length === 0 && recentSearches.length > 0 && (
            <CommandGroup heading="Tìm kiếm gần đây">
              {recentSearches.map((search) => (
                <CommandItem
                  key={search}
                  onSelect={() => setQuery(search)}
                  className="group flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{search}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeRecentSearch(search);
                    }}
                    className="rounded p-1 opacity-0 hover:bg-muted-foreground/20 group-hover:opacity-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {!isSearching && debouncedQuery.length > 0 && (
            <CommandEmpty>Không tìm thấy kết quả cho "{debouncedQuery}"</CommandEmpty>
          )}

          {!isSearching && debouncedQuery.length > 0 && (
            <>
              {stations.length > 0 && (
                <CommandGroup heading="Trạm sạc">
                  {stations.map((station) => (
                    <CommandItem
                      key={station.id}
                      onSelect={() =>
                        handleSelect(station.name, `${ROUTES.STATIONS}/${station.id}`)
                      }
                    >
                      <MapPin className="mr-2 h-4 w-4 text-primary" />
                      <div className="flex flex-col">
                        <span>{station.name}</span>
                        <span className="text-xs text-muted-foreground">{station.address}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {chargers.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Bộ sạc">
                    {chargers.map((charger) => (
                      <CommandItem
                        key={charger.id}
                        onSelect={() =>
                          handleSelect(charger.id, `${ROUTES.CHARGERS}/${charger.id}`)
                        }
                      >
                        <Zap className="mr-2 h-4 w-4 text-warning" />
                        <div className="flex flex-col">
                          <span className="font-mono">{charger.id}</span>
                          <span className="text-xs text-muted-foreground">
                            {charger.stationName}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}

              {users.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Người dùng">
                    {users.map((user) => (
                      <CommandItem
                        key={user.id}
                        onSelect={() => handleSelect(user.name, `${ROUTES.USERS}/${user.id}`)}
                      >
                        <User className="mr-2 h-4 w-4 text-success" />
                        <div className="flex items-center gap-2">
                          <span>{user.name}</span>
                          <span className="text-xs text-muted-foreground">- {user.phone}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
