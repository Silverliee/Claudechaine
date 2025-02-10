export async function GET(
    request: Request,
    { params }: { params: { address: string } }
) {
    const { address } = params;

    return new Promise((resolve) => {
        db.all(`
      SELECT 
        transaction_hash,
        block_number,
        timestamp,
        transaction_type,
        amount,
        purchase_type
      FROM transactions
      WHERE user_address = ?
      ORDER BY timestamp DESC
      LIMIT 100
    `,
            [address],
            (err, rows) => {
                if (err) {
                    resolve(NextResponse.json({ error: err.message }, { status: 500 }));
                } else {
                    resolve(NextResponse.json({ data: rows }));
                }
            });
    });
}