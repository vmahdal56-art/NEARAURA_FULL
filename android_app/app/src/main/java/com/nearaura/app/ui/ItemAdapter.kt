package com.nearaura.app.ui

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide // Potřebný import pro načítání obrázků
import com.nearaura.app.databinding.ItemListRowBinding
import com.nearaura.app.models.Item

class ItemAdapter(private var items: List<Item>) : RecyclerView.Adapter<ItemAdapter.ItemViewHolder>() {

    /**
     * ViewHolder, který drží reference na views pro jednu položku seznamu.
     * Používá auto-generovanou třídu ItemListRowBinding pro bezpečný přístup k views.
     */
    inner class ItemViewHolder(val binding: ItemListRowBinding) : RecyclerView.ViewHolder(binding.root)

    /**
     * Volá se, když RecyclerView potřebuje vytvořit nový ViewHolder.
     * Zde se "nafoukne" (vytvoří) layout pro jednu řádku (item_list_row.xml).
     */
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder {
        val binding = ItemListRowBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ItemViewHolder(binding)
    }

    /**
     * Volá se, když RecyclerView potřebuje zobrazit data v konkrétním ViewHolderu.
     * Zde propojíme data z našeho modelu `Item` s views v layoutu.
     */
    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        // Získáme datový objekt pro aktuální pozici
        val item = items[position]

        // --- ZDE JSOU PROVEDENÉ OPRAVY ---

        // 1. Nastavíme text pro 'itemTitle' pomocí existující vlastnosti 'name' z modelu Item.
        holder.binding.itemTitle.text = item.name

        // 2. Pro 'itemDescription' zatím nemáme v modelu data, proto zobrazíme něco dočasného,
        //    například ID položky, aby bylo jasné, že to funguje.
        //    Později můžete tuto část upravit, až budete mít v modelu více dat.
        holder.binding.itemDescription.text = "ID: ${item.id}"

        // 3. (Bonus) Načteme obrázek pomocí Glide do 'itemImage' z vlastnosti 'imageUrl'.
        //    Ujistěte se, že váš layout 'item_list_row.xml' obsahuje ImageView s id 'itemImage'.
        Glide.with(holder.itemView.context)
            .load(item.imageUrl)
            .into(holder.binding.itemImage) // Předpokládá ImageView s id 'itemImage'
    }

    /**
     * Vrací celkový počet položek v seznamu.
     */
    override fun getItemCount() = items.size

    /**
     * Metoda pro aktualizaci dat v adaptéru a překreslení RecyclerView.
     */
    fun updateData(newItems: List<Item>) {
        this.items = newItems
        notifyDataSetChanged() // Jednoduchá metoda pro překreslení, pro větší seznamy se doporučuje DiffUtil.
    }
}
