# SSL certificate watcher

Watch SSL certs using Github Actions and act based on expiry date or days until expiry.

Forked from <https://github.com/codex-team/action-check-domain>.

## Inputs

### `host`

Host to be checked, e.g <example.com>.

## Outputs

### `ssl-expiry-date`

SSL certificate expire date

### `ssl-expiry-days-left`

SSL certificate expire number of days left

## Example usage

```yaml
- name: Check domain SSL and registry expire date
  id: check-domain
  uses: techcloud0-actions/certificate-expiry-check@<HASH>
  with:
    host: ${{ matrix.host }}

- run: echo 'SSL cert has ${{ steps.check-domain.outputs.ssl-expiry-days-left }} days left'
  if: ${{ steps.check-domain.outputs.ssl-expiry-days-left }}
```
