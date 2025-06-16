# 3. AddToCartComponent: Invalid Decorator Syntax

**File**: `src/app/components/add-to-cart/add-to-cart.component.ts`

**Problems**:

- `@Component` ended with a semicolon.
- Used `styleUrl` instead of `styleUrls`.

**Fixes**:

- Removed the semicolon after `@Component({...})`.
- Corrected `styleUrl` → `styleUrls`.

**Improved**:

- Prevented `quantity` from dropping below 1 in `decreaseProductItem()`